const users = `
  query users {
    users {
      _id
      details {
        avatar
        fullName
      }
    }
  }
`;

const brands = `
  query brands {
    brands {
      _id
      name
      code
    }
  }
`;

const integrationDetail = `
  query integrationDetail($_id: String!) {
    integrationDetail(_id: $_id) {
      _id
      name
      brandId
      languageCode
      messengerData
      uiOptions
    }
  }
`;

const integrationTotalCount = `
  query totalIntegrationsCount {
    integrationsTotalCount {
      total
      byKind
    }
  }
`;

const commonParamsDef = `
  $channelId: String,
  $brandId: String,
  $kind: String,
  $perPage: Int,
  $page: Int,
  $searchValue: String
`;

const commonParams = `
  channelId: $channelId,
  brandId: $brandId,
  kind: $kind,
  perPage: $perPage,
  page: $page,
  searchValue: $searchValue
`;

const integrations = `
  query integrations(${commonParamsDef}) {
    integrations(${commonParams}) {
      _id
      brandId
      languageCode
      name
      kind
      brand {
        _id
        name
        code
      }
      formData
      twitterData
      formId
      tagIds
      tags {
        _id
        colorCode
        name
      }
      form {
        _id
        title
        code
      }
      channels {
        _id
        name
      }
    }
  }
`;

const messengerApps = `
  query messengerApps($kind: String) {
    messengerApps(kind: $kind) {
      _id
      name
      kind
    }
  }
`;

const getGoogleAccessToken = `
  query integrationGetGoogleAccessToken($code: String) {
    integrationGetGoogleAccessToken(code: $code)
  }
`;

const getGoogleAuthUrl = `
  query integrationGetGoogleAuthUrl {
    integrationGetGoogleAuthUrl
  }
`;

export default {
  users,
  brands,
  integrationDetail,
  integrationTotalCount,
  integrations,
  messengerApps,
  getGoogleAccessToken,
  getGoogleAuthUrl
};
