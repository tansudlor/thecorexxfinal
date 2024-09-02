# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Expose the port that your Next.js app runs on
EXPOSE 3456

# Environment variables
ENV NEXT_PUBLIC_ASSET_URL=https://playbux-alpha.s3.ap-southeast-1.amazonaws.com
ENV NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=f8323fe2175cf7ce43512384cf433838
ENV NEXT_PUBLIC_CHAIN_ID=97
ENV MORALIS_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijg2OGQyYzkwLTg0NzktNDdhOS05NmJjLWQ2YzliOTM2NjJhYSIsIm9yZ0lkIjoiMzc3Njc3IiwidXNlcklkIjoiMzg4MTE1IiwidHlwZUlkIjoiZTQ0NTg3N2MtMDIyYS00YzQ3LWEwNWYtY2MwNDMxMzk0MmQwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDgxODY2NTIsImV4cCI6NDg2Mzk0NjY1Mn0.nmeK45Q8kzSMT1liusolgu38WkRyzrLZR9vQkfi1rHw
ENV MONGODB_URI="mongodb+srv://all_dev:b7rhKoTusM5ejrdb@playbux-development.pr1rrev.mongodb.net/playbux_thecore"

# Start the application
CMD ["yarn", "dev"]
