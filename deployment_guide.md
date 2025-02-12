# Deployment Guide: Registration System with Message Service on Azure

## Overview
This guide documents the deployment of our two-service architecture on Azure:
1. Python Flask Server (Registration Service)
2. Node.js Server (Message Service with OpenAI integration)

## Prerequisites
- Azure Account Created
- Azure CLI installed
- MongoDB Atlas cluster configured
- OpenAI API key

## Azure Credentials Management

### Store Azure Credentials Securely
1. Create a `.azure-credentials` file (add to .gitignore):
   ```
   AZURE_SUBSCRIPTION_ID=<your-subscription-id>
   AZURE_TENANT_ID=<your-tenant-id>
   AZURE_CLIENT_ID=<your-client-id>
   AZURE_CLIENT_SECRET=<your-client-secret>
   ```

## Deployment Steps

### 1. Deploy Registration Service (Python Flask)

1. Create Azure App Service:
   ```bash
   az webapp create --name registration-service --resource-group myResourceGroup --plan myAppServicePlan --runtime "PYTHON:3.9"
   ```

2. Configure environment variables:
   ```bash
   az webapp config appsettings set --name registration-service --resource-group myResourceGroup --settings MONGODB_URI="your_mongodb_uri" MESSAGE_SERVICE_URL="your_message_service_url"
   ```

3. Deploy code:
   ```bash
   az webapp deployment source config-zip --name registration-service --resource-group myResourceGroup --src registration-service.zip
   ```

### 2. Deploy Message Service (Node.js)

1. Create Azure App Service:
   ```bash
   az webapp create --name message-service --resource-group myResourceGroup --plan myAppServicePlan --runtime "NODE:16-lts"
   ```

2. Configure environment variables:
   ```bash
   az webapp config appsettings set --name message-service --resource-group myResourceGroup --settings OPENAI_API_KEY="your_openai_key"
   ```

3. Deploy code:
   ```bash
   az webapp deployment source config-zip --name message-service --resource-group myResourceGroup --src message-service.zip
   ```

## Post-Deployment Configuration

1. Update MESSAGE_SERVICE_URL in registration service to point to the deployed message service URL:
   ```bash
   az webapp config appsettings set --name registration-service --resource-group myResourceGroup --settings MESSAGE_SERVICE_URL="https://message-service.azurewebsites.net"
   ```

2. Configure CORS if needed:
   ```bash
   az webapp cors add --name message-service --resource-group myResourceGroup --allowed-origins "https://registration-service.azurewebsites.net"
   ```

## Monitoring and Maintenance

1. View logs:
   ```bash
   az webapp log tail --name registration-service --resource-group myResourceGroup
   az webapp log tail --name message-service --resource-group myResourceGroup
   ```

2. Set up monitoring:
   ```bash
   az monitor app-insights component create --app registration-monitoring --location eastus --resource-group myResourceGroup
   ```

## Troubleshooting

1. Check service status:
   ```bash
   az webapp show --name registration-service --resource-group myResourceGroup --query state
   az webapp show --name message-service --resource-group myResourceGroup --query state
   ```

2. Restart services if needed:
   ```bash
   az webapp restart --name registration-service --resource-group myResourceGroup
   az webapp restart --name message-service --resource-group myResourceGroup
   ```