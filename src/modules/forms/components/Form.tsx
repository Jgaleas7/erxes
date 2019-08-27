import FormControl from 'modules/common/components/form/Control';
import ControlLabel from 'modules/common/components/form/Label';
import { LeftItem } from 'modules/common/components/step/styles';
import { __ } from 'modules/common/utils';
import { IField } from 'modules/settings/properties/types';
import React from 'react';
import FormGroup from '../../common/components/form/Group';
import { Title } from '../styles';
import { IFormPreviewContent } from '../types';
import Fields from './Fields';
import FormField from './FormField';

type Props = {
  fields: IField[];
  previewContent: (props: IFormPreviewContent) => void;
};

type State = {
  fields?: IField[];
  chosenFieldType?: string;
  editingField?: IField;
  formTitle: string;
  formDesc: string;
  formBtnText: string;
};

class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fields: props.fields,
      chosenFieldType: '',
      formTitle: '',
      formDesc: '',
      formBtnText: 'Send',
      editingField: undefined
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ fields: nextProps.fields });
  }

  onChange = <T extends keyof State>(key: T, value: State[T]) => {
    this.setState({ [key]: value } as Pick<State, keyof State>);
  };

  onFieldChange = (value: IField, callback: () => void) => {
    this.setState({ editingField: value }, () => callback());
  };

  onSubmit = e => {
    e.preventDefault();

    const editingField = this.state.editingField || ({} as IField);

    const doc = {
      contentType: 'form',
      type: editingField.type,
      validation: editingField.validation,
      text: editingField.text,
      description: editingField.description,
      options: editingField.options,
      order: 0,
      isRequired: editingField.isRequired
    };

    // newly created field to fields state
    (this.state.fields || []).push({
      _id: Math.random().toString(),
      ...doc
    });

    this.setState({ fields: this.state.fields, editingField: undefined });

    this.onChange('fields', this.state.fields || []);
  };

  onDelete = fieldId => {
    // remove field from state
    const fields = (this.state.fields || []).filter(
      field => field._id !== fieldId
    );

    this.setState({ fields });

    this.onChange('fields', fields);
  };

  onFieldEdit = (field: IField, props) => {
    return (
      <FormField
        {...props}
        field={field}
        fields={this.state.fields}
        onSubmit={this.onSubmit}
        onDelete={this.onDelete}
        onChange={this.onChange}
      />
    );
  };

  render() {
    const { previewContent } = this.props;
    const { formTitle, formBtnText, formDesc, fields } = this.state;

    const onChangeTitle = e =>
      this.onChange('formTitle', (e.currentTarget as HTMLInputElement).value);

    const onChangeDesc = e =>
      this.onChange('formDesc', (e.currentTarget as HTMLInputElement).value);

    const onChangeBtnText = e =>
      this.onChange('formBtnText', (e.currentTarget as HTMLInputElement).value);

    return (
      <>
        <LeftItem>
          <FormGroup>
            <ControlLabel required={true}>{__('Form title')}</ControlLabel>
            <FormControl
              id="form-btn-text"
              value={formTitle}
              onChange={onChangeTitle}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel required={true}>
              {__('Form description')}
            </ControlLabel>
            <FormControl
              id="form-btn-text"
              componentClass="textarea"
              value={formDesc}
              onChange={onChangeDesc}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel required={true}>
              {__('Form button text')}
            </ControlLabel>
            <FormControl
              id="form-btn-text"
              value={formBtnText}
              onChange={onChangeBtnText}
            />
          </FormGroup>

          <Title>New field</Title>
          <Fields
            onSubmit={this.onSubmit}
            onChange={this.onFieldChange}
            editingField={this.state.editingField}
          >
            <option value="input">{__('Input')}</option>
            <option value="textarea">{__('Text area')}</option>
            <option value="select">{__('Select')}</option>
            <option value="check">{__('Checkbox')}</option>
            <option value="radio">{__('Radio button')}</option>
            <option value="phone">{__('Phone')}</option>
            <option value="email">{__('Email')}</option>
            <option value="firstName">{__('First name')}</option>
            <option value="lastName">{__('Last name')}</option>
          </Fields>
        </LeftItem>

        {previewContent({
          formTitle,
          formBtnText,
          formDesc,
          fields,
          onFieldEdit: this.onFieldEdit
        })}
      </>
    );
  }
}

export default Form;