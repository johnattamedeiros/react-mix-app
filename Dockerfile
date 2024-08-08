# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Compila o projeto React
RUN npm run build

# Expõe a porta 3001
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npx", "serve", "-s", "build", "-l", "3001"]
