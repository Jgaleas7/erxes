const segmentFields = `
  _id
  name
  description
  subOf
  color
  connector
  conditions
`;

const segments = `
  query segments($contentType: String!) {
    segments(contentType: $contentType) {
      ${segmentFields}

      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;

const segmentDetail = `
  query segmentDetail($_id: String) {
    segmentDetail(_id: $_id) {
      ${segmentFields}
      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;

const headSegments = `
  query headSegments {
    segmentsGetHeads {
      ${segmentFields}
      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;

const combinedFields = `
  query fieldsCombinedByContentType($contentType: String!) {
    fieldsCombinedByContentType(contentType: $contentType)
  }
`;

export default {
  segments,
  segmentDetail,
  headSegments,
  combinedFields
};
