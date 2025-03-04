#!/bin/bash

# Check if the endpoint name is provided
if [ -z "$1" ]; then
  echo "Usage: npm run create:endpoint -- <endpoint-name>"
  echo "Example: npm run create:endpoint -- shopping-session"
  exit 1
fi

# Set variables
ENDPOINT_NAME=$1

# Convert kebab-case to camelCase and PascalCase
if [[ $ENDPOINT_NAME == *-* ]]; then
  # For kebab-case like "shopping-session"
  # First to camelCase (shoppingSession)
  ENDPOINT_NAME_CAMELCASE=$(echo $ENDPOINT_NAME | awk -F'-' '{for(i=1;i<=NF;i++){if(i==1){printf "%s", $i} else {printf "%s%s", toupper(substr($i,1,1)), substr($i,2)}}}')
  
  # Then to PascalCase (ShoppingSession)
  ENDPOINT_NAME_PASCALCASE=$(echo $ENDPOINT_NAME_CAMELCASE | awk '{printf "%s%s", toupper(substr($0,1,1)), substr($0,2)}')
else
  # For single words like "product"
  ENDPOINT_NAME_CAMELCASE=$ENDPOINT_NAME
  ENDPOINT_NAME_PASCALCASE=$(echo $ENDPOINT_NAME | awk '{printf "%s%s", toupper(substr($0,1,1)), substr($0,2)}')
fi

# Controller class name with "Controller" suffix
CONTROLLER_NAME="${ENDPOINT_NAME_PASCALCASE}Controller"

SRC_DIR="src"

# Create directories if they don't exist
MODEL_DIR="$SRC_DIR/models"
SERVICE_DIR="$SRC_DIR/services"
CONTROLLER_DIR="$SRC_DIR/controllers"
ROUTE_DIR="$SRC_DIR/routes"

mkdir -p $MODEL_DIR $SERVICE_DIR $CONTROLLER_DIR $ROUTE_DIR

# Create empty model file
MODEL_FILE="$MODEL_DIR/$ENDPOINT_NAME.model.ts"
echo "Creating model file: $MODEL_FILE"
touch $MODEL_FILE

# Create empty service file
SERVICE_FILE="$SERVICE_DIR/$ENDPOINT_NAME.service.ts"
echo "Creating service file: $SERVICE_FILE"
touch $SERVICE_FILE

# Create empty controller file
CONTROLLER_FILE="$CONTROLLER_DIR/$ENDPOINT_NAME.controller.ts"
echo "Creating controller file: $CONTROLLER_FILE"
touch $CONTROLLER_FILE

# Create route file with Swagger documentation
ROUTE_FILE="$ROUTE_DIR/$ENDPOINT_NAME.routes.ts"
echo "Creating route file with Swagger docs: $ROUTE_FILE"
cat > $ROUTE_FILE << EOF
import express from 'express';
import { asyncHandler } from '@middlewares/error.middleware';
import ${CONTROLLER_NAME} from '@controllers/${ENDPOINT_NAME}.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ${ENDPOINT_NAME_PASCALCASE}s
 *   description: ${ENDPOINT_NAME_PASCALCASE} management endpoints
 */

/**
 * @swagger
 * /${ENDPOINT_NAME}s:
 *   post:
 *     summary: Create a new ${ENDPOINT_NAME}
 *     tags: [${ENDPOINT_NAME_PASCALCASE}s]
 *     security:
 *       - AuthorizationAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: ${ENDPOINT_NAME_PASCALCASE} created successfully
 */
router.post('/', asyncHandler(${CONTROLLER_NAME}.add${ENDPOINT_NAME_PASCALCASE}));

/**
 * @swagger
 * /${ENDPOINT_NAME}s:
 *   get:
 *     summary: Get all ${ENDPOINT_NAME}s
 *     tags: [${ENDPOINT_NAME_PASCALCASE}s]
 *     responses:
 *       200:
 *         description: List of all ${ENDPOINT_NAME}s
 */
router.get('/', asyncHandler(${CONTROLLER_NAME}.get${ENDPOINT_NAME_PASCALCASE}s));

/**
 * @swagger
 * /${ENDPOINT_NAME}s/{id}:
 *   get:
 *     summary: Get a ${ENDPOINT_NAME} by ID
 *     tags: [${ENDPOINT_NAME_PASCALCASE}s]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ${ENDPOINT_NAME_PASCALCASE} details
 *       404:
 *         description: ${ENDPOINT_NAME_PASCALCASE} not found
 */
router.get('/:id', asyncHandler(${CONTROLLER_NAME}.get${ENDPOINT_NAME_PASCALCASE}));

/**
 * @swagger
 * /${ENDPOINT_NAME}s/{id}:
 *   put:
 *     summary: Update a ${ENDPOINT_NAME}
 *     tags: [${ENDPOINT_NAME_PASCALCASE}s]
 *     security:
 *       - AuthorizationAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: ${ENDPOINT_NAME_PASCALCASE} updated successfully
 *       404:
 *         description: ${ENDPOINT_NAME_PASCALCASE} not found
 */
router.put('/:id', asyncHandler(${CONTROLLER_NAME}.update${ENDPOINT_NAME_PASCALCASE}));

/**
 * @swagger
 * /${ENDPOINT_NAME}s/{id}:
 *   delete:
 *     summary: Delete a ${ENDPOINT_NAME}
 *     tags: [${ENDPOINT_NAME_PASCALCASE}s]
 *     security:
 *       - AuthorizationAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ${ENDPOINT_NAME_PASCALCASE} deleted successfully
 *       404:
 *         description: ${ENDPOINT_NAME_PASCALCASE} not found
 */
router.delete('/:id', asyncHandler(${CONTROLLER_NAME}.delete${ENDPOINT_NAME_PASCALCASE}));

export default router;
EOF

# Print debug information
echo "Debug information:"
echo "ENDPOINT_NAME: $ENDPOINT_NAME"
echo "ENDPOINT_NAME_CAMELCASE: $ENDPOINT_NAME_CAMELCASE"
echo "ENDPOINT_NAME_PASCALCASE: $ENDPOINT_NAME_PASCALCASE"
echo "CONTROLLER_NAME: $CONTROLLER_NAME"

echo "✅ Endpoint '$ENDPOINT_NAME' created successfully!"
echo "Empty files created with Swagger documentation in the route file."
echo "You can now use 'npm run create:endpoint -- <endpoint-name>' to create new endpoints" 