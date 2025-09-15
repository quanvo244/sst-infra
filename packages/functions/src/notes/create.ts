import * as uuid from "uuid";
import { Resource } from "sst"; 
import { Util } from "@monorepo-template/core/util"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event: APIGatewayProxyEvent) => {
    let data = {
        content: "",
        attachment: "",
    };

    if (event.body != null) {
        data = JSON.parse(event.body);
    }

    const params = {
        TableName: Resource.Notes.name,
        Item: {
            // The attributes of the item to be created
            userId: "123", // The id of the author
            noteId: uuid.v1(), // A unique uuid
            content: data.content, // Parsed from request body
            attachment: data.attachment, // Parsed from request body
            createdAt: Date.now(), // Current Unix timestamp
        },
    };

    await dynamoDb.send(new PutCommand(params));

    return JSON.stringify(params.Item);
});