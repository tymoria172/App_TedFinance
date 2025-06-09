# 🧸 TEDDY OPEN FINANCE

![Teddy Open Finance Banner](https://lp.teddydigital.io/wp-content/uploads/2024/01/logo-branco-2048x993-1-1024x497.webp)

## 📝 Descrição do Projeto

O **Teddy Open Finance** é um aplicativo mobile desenvolvido com React Native e Expo que oferece:

✨ **Tela de Boas-Vindas** personalizada  
📋 **Listagem Completa** de clientes cadastrados  
🛠 **Operações CRUD** (Criar, Ler, Atualizar e Deletar)  
👀 **Visualização Detalhada** de clientes selecionados  
🎨 **Interface Moderna** e intuitiva

---

## 🛠 Tecnologias Utilizadas

### Core
- ⚛️ React Native 0.79.2
- 🔵 TypeScript 5.8.3
- 🚀 Expo 53.0.9
- 🔄 React Navigation v7

### Principais Bibliotecas
- 🎭 React Native Reanimated 3.17.4  
- 📡 Axios 1.9.0  
- 🗃️ @react-native-async-storage/async-storage 2.1.2  
- 📲 React Native Gesture Handler 2.24.0  

### Testes
- 🧪 Jest 29.7.0  
- 🧐 @testing-library/react-native 13.2.0  
- 🔍 @types/jest 29.5.14  

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/tymoria172/App_TedFinance
cd App
```

### 2. Instale as dependências
```bash
npm install --legacy-peer-deps
# ou
yarn install --ignore-engines
```

### 3. Instale o Expo CLI globalmente (se ainda não tiver)

```bash
npm install -g expo-cli
```

### 4. Inicie o servidor

```bash
npx expo start
```
### 5. Execute no seu dispositivo
📱 Use o Expo Go (escanear QR code) para dispositivo físico (Baixe na loja do seu dispositivo)
🤖 Ou pressione:

```bash
a  # Android emulator
i  # iOS simulator
w  # Navegador web
```

## 🧪 Executando Testes
```bash
npm test
```
## 📂 Estrutura do Projeto

TeddyClient/
├── .expo/
├── node_modules/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── models/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── theme/
│   ├── types/
│   └── utils/
├── .gitignore
├── app.json
├── App.tsx
├── index.ts
├── package.json
├── package-lock.json
└── tsconfig.json

Desenvolvido com ❤️ por [André] © 2024