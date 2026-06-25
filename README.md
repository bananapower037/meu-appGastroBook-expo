# GastroBook

O GastroBook é um aplicativo mobile desenvolvido com React Native e Expo que funciona como uma rede social gastronômica, permitindo que usuários compartilhem, descubram e interajam com receitas culinárias.

## Objetivo

O objetivo do GastroBook é oferecer uma plataforma intuitiva para que usuários possam publicar receitas, explorar novos pratos, interagir com outros cozinheiros e organizar suas experiências culinárias em um único ambiente.

## Funcionalidades

* Cadastro e autenticação de usuários;
* Criação e gerenciamento de perfil;
* Publicação de receitas;
* Edição e exclusão de receitas próprias;
* Feed de receitas compartilhadas pelos usuários;
* Exibição de novos usuários e receitas no feed;
* Sistema de curtidas nas receitas;
* Sistema de avaliação por estrelas;
* Comentários nas receitas;
* Favoritar receitas;
* Pesquisa de receitas;
* Filtro de receitas por categorias;
* Visualização detalhada das receitas;
* Exploração de perfis de outros usuários.

## Tecnologias Utilizadas

* React Native
* Expo
* Expo Router
* JavaScript
* Firebase
* Async Storage

## Estrutura do Projeto

```text id="oh7drh"
GASTROBOOK/
├── .expo/
├── app/
│   ├── cadastro.jsx
│   ├── criarReceita.jsx
│   ├── detalhes.jsx
│   ├── editarReceita.jsx
│   ├── explorar.jsx
│   ├── favoritos.jsx
│   ├── home.jsx
│   ├── index.jsx
│   ├── login.jsx
│   ├── perfil.jsx
│   └── perfilUsuario.jsx
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── node_modules/
├── src/
│   ├── components/
│   │   ├── CardReceita.jsx
│   │   └── Header.jsx
│   ├── data/
│   │   └── receitas.js
│   ├── services/
│   │   ├── api.js
│   │   └── firebaseConfig.js
│   ├── storage/
│   │   └── receitasStorage.js
│   └── styles/
│       ├── colors.js
│       └── global.js
├── .gitignore
├── app.json
├── eas.json
├── package-lock.json
└── package.json
```

## Como Instalar

Clone este repositório:

```bash id="j0t0f2"
git clone <url-do-repositorio>
```

Instale as dependências:

```bash id="e8v95s"
npm install
```

## Como Executar

Para iniciar o projeto em ambiente de desenvolvimento:

```bash id="b4m6sx"
npx expo start
```

Após iniciar, utilize o aplicativo Expo Go ou um emulador Android para executar o aplicativo.

## Como Gerar o APK

Configure o EAS Build:

```bash id="2p1rsl"
npx eas build:configure
```

Gere o APK:

```bash id="2u87ya"
npx eas build -p android --profile preview
```

## Release

O arquivo APK distribuível encontra-se disponível na seção de Releases deste repositório.

## Estado Atual do Projeto

Atualmente, o GastroBook encontra-se funcional, permitindo a interação entre usuários através do compartilhamento e avaliação de receitas, oferecendo uma experiência semelhante a uma rede social voltada para gastronomia.

## Autor

Lais Ribeiro Megda e Pedro Luca Santos Garcia

Projeto desenvolvido para fins acadêmicos na disciplina de Desenvolvimento Mobile.
