#!/bin/bash

# Parar o contêiner, se estiver em execução
docker stop gc_data_front

# Remover o contêiner
docker rm gc_data_front

# Remover a imagem
docker rmi gc_data_front

# Construir a nova imagem
docker build -t gc_data_front .

# Rodar o contêiner
docker run -d --name gc_data_front -p 3001:3001 gc_data_front

echo "Container 'gc_data_front' iniciado e disponível na porta 3001."
