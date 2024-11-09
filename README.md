# Instalação com Docker Compose

Este repositório contém os artefatos necessários para executar a aplicação utilizando o Docker Compose. Siga os passos abaixo para configurar o ambiente.

---

## Pré-requisitos

Antes de iniciar, verifique se os seguintes itens estão instalados:

1. **Git** - Para clonar o repositório.
2. **Docker** e **Docker Compose** - Para criar e gerenciar os containers da aplicação.

Caso não tenha essas ferramentas instaladas, consulte as instruções de instalação nos links abaixo:
- [Instalação do Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Instalação do Docker](https://docs.docker.com/get-docker/)
- [Instalação do Docker Compose](https://docs.docker.com/compose/install/)

---

## Passo a Passo

### 1. Clone este repositório

Em um diretório de sua escolha, clone o repositório com o comando abaixo e acesse a pasta do projeto:

```bash
git clone https://github.com/rafael-cano/fullstack_interview.git
cd fullstack_interview
2. Inicie os serviços com Docker Compose
Utilize o Docker Compose para carregar e disponibilizar todos os serviços necessários para o funcionamento da aplicação:

bash
Copiar código
docker-compose up
Esse comando irá construir as imagens Docker, baixar as dependências e iniciar os containers conforme a configuração especificada no arquivo docker-compose.yml.

3. Acesse a aplicação
Após os containers estarem em execução, acesse a aplicação no navegador utilizando a URL:

http://localhost:3000
Finalizando a Execução
Para parar os containers, utilize o comando:

bash
Copiar código
docker-compose down
Este comando encerra todos os containers e libera os recursos do sistema.

Recursos Adicionais
Documentação do Docker Compose(https://docs.docker.com/compose/)
Documentação do Docker(https://docs.docker.com/)
