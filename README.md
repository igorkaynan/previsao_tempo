
# WeatherApp - Aplicativo de Clima em React Native

Este é um aplicativo simples feito com React Native e Expo que exibe o clima atual baseado na localização do usuário. Utiliza a API do OpenWeather para buscar os dados meteorológicos e o Expo Location para obter a geolocalização do dispositivo.

## Funcionalidades

    - Solicita permissão para acessar a localização do usuário.
    - Obtém a latitude e longitude atuais do dispositivo.
    - Converte as coordenadas em um nome de cidade.
    - Consulta a API do OpenWeather para obter dados de clima atual.
    - Exibe temperatura, sensação térmica, umidade e velocidade do vento.
    - Altera o fundo do aplicativo conforme o clima (ex: chuva, céu limpo, nublado).
    

## Tecnologias Utilizadas

- React Native
- Expo
- Expo Location
- Axios
- API OpenWeather

## Como Instalar e Usar

1. **Baixe o projeto:**

    - Faça o download do arquivo ZIP deste repositório ou clone via Git.
    - Extraia os arquivos para uma pasta local.
    - Navegue até a pasta do projeto.
    - Instale as dependências do React Native e Expo com:
    npm install ou yarn install

Abra o app no seu dispositivo físico usando o aplicativo Expo Go (disponível para Android e iOS) ou emulador/simulador configurado.

O app solicitará permissão para acessar sua localização e mostrará o clima atual da sua cidade.

2. **Abrir o projeto:**

    Execute o comando para iniciar o Expo:
    npm start ou yarn start

> **Nota:** Nota: Certifique-se de ter o Node.js, npm/yarn, e o Expo CLI instalados corretamente para garantir o funcionamento do projeto. Também é necessário uma conexão ativa com a internet para buscar os dados do clima.

## Créditos
Este projeto foi inspirado em diversas fontes e documentações oficiais da Expo e OpenWeather. Todo o código foi escrito manualmente para praticar e aprender React Native, Expo Location e integração com APIs externas.

## Licença

Este projeto é de uso livre para fins educacionais e não possui nenhuma restrição de uso.
