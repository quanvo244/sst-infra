
// Create new bucket in aws resource
export const bucket = new sst.aws.Bucket("Uploads")

// Create new table in DynamoDB
export const table = new sst.aws.Dynamo("Notes", {
    fields: {
        userId: "string",
        noteId: "string",
    },
    primaryIndex: { hashKey: "userId", rangeKey: "noteId" },
});
