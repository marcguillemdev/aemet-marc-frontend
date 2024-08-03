
# AEMET Angular Application
Application developed with Angular 18 that shows forecast information through '[aemet-marc-backend](https://github.com/marcguillemdev/aemet-marc-backend)'.

## Preview
<p float='left'>
  <img src='https://github.com/marcguillemdev/aemet-marc-frontend/blob/main/public/aemet_1_proc.png?raw=true' width='450px'>
  <img src='https://github.com/marcguillemdev/aemet-marc-frontend/blob/main/public/aemet_2_proc.png?raw=true' width='450px'>
</p>

## 🛠️ Setup development environment
This project uses **DevContainers** to build all the dependencies and programs needed to run it.
If you've never heard of them, [here's some more information](https://code.visualstudio.com/docs/devcontainers/containers).

> Before you can open and run the DevContainer, you need to have cloned
> the repository into a Linux environment, such as Ubuntu. 
> If you are not in Linux, follow the Windows steps.

## 🪟 Windows environment
You will need to install **WSL2 (with Ubuntu)** and **Docker Desktop** and then **link Ubuntu with Docker Desktop**.

 - **WSL installation**: [click here](https://learn.microsoft.com/en-us/windows/wsl/install).
 - **Ubuntu distro installation**: [click here](https://apps.microsoft.com/detail/9pn20msr04dw?hl=es-es&gl=ES).

Once you have the above set up, **you have to link Docker Desktop with your downloaded Ubuntu distro** running in WSL:
 1. Open Docker Desktop --> Settings --> Resources --> WSL Integration.
 2. Select your Ubuntu distro.

### 📃 Running Visual Studio Code
For everything to start properly, we have to open Visual Studio Code and download the [VSCode Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) to be able to connect to our distro in WSL. To connect:

 1. **Open the command palette and type 'Connect to WSL distro...'**
 2. Select our Ubuntu distro.

## 🐧 Linux environment
If you are on Linux (Ubuntu), the only thing you need to have installed is Docker.

##  💾 Cloning the repository
It is important to note that the repository **clone has to be done once we have connected to the WSL (if you are on Windows)** from our VSCode.

Once we have done so, we can run the command in a new terminal **INSIDE** VSCode:

    git clone https://github.com/marcguillemdev/aemet-marc-backend

## 🎉 Running DevContainer
1. **Open the command palette and type 'Reopen in container...' or 'Open folder in container...'**
 2. Wait for the container to load
 3. Run: `npm install` from a embedded vscode terminal to install node dependencies.
 4. Run: `npm run start`
 5. Open [http://localhost:4200](http://localhost:4200)

## 🐋 DockerHub
The package is available through [DockerHub](https://hub.docker.com/r/marcguillemdev/aemet-marc-frontend).

## 💼 LICENSE
 [GNU General Public License v3.0](https://github.com/marcguillemdev/aemet-marc-frontend/blob/main/LICENSE)
