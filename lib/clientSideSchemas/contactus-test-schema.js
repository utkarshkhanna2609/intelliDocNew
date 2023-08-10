// lib/clientSideSchemas/contactus-test-schema.js

// lib/clientSideSchemas/contactus-test-schema.js

const contactUsSchema = {
  senderId: {
    type: "string",
    maxLength: 10,
    pattern: "^[a-zA-Z0-9]*$",
  },
  messageId: {
    type: "string",
    maxLength: 10,
    pattern: "^[a-zA-Z0-9]*$",
  },
  message: {
    type: "string",
    maxLength: 500,
  },
  referred: {
    type: "string",
    optional: true,
  },
  phoneNumber: {
    type: "string",
    optional: true,
    pattern: "^\+[0-9]{1,3}[0-9]{10}$",
  },
  companyName: {
    type: "string",
    optional: true,
  },
  profession: {
    type: "string",
    optional: true,
  },
  resolution: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      resolverID: {
        type: "string",
      },
      resolutionDescription: {
        type: "string",
      },
      attendedDate: {
        type: "string",
        format: "date-time",
      },
      resolutionDate: {
        type: "string",
        format: "date-time",
      },
    },
    optional: true,
  },
  createdAt: {
    type: "string",
    format: "date-time",
  },
  active: {
    type: "boolean",
  },
  archivedAt: {
    type: "string",
    format: "date-time",
    optional: true,
  },
  deletedAt: {
    type: "string",
    format: "date-time",
    optional: true,
  },
};

export default contactUsSchema;

  