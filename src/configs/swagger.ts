import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Shopify API',
			version: '1.0.0',
			description: 'API documentation using Swagger',
		},
		servers: [
			{
				url: `${process.env.SELF_URL?.endsWith('/') ? process.env.SELF_URL.slice(0, -1) : process.env.SELF_URL}/api`,
			},
		],
		components: {
			securitySchemes: {
				ApiKeyAuth: {
					type: 'apiKey',
					description: 'API Key',
					in: 'header',
					name: 'x-api-key',
				},
				AuthorizationAuth: {
					type: 'apiKey',
					description: 'Authorization',
					in: 'header',
					name: 'authorization',
				},
				ClientIdAuth: {
					type: 'apiKey',
					description: 'Client ID',
					in: 'header',
					name: 'x-client-id',
				},
			},
		},
		security: [
			{
				ApiKeyAuth: [],
				AuthorizationAuth: [],
				ClientIdAuth: [],
			},
		],
	},
	apis: ['./**/*.ts'],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
