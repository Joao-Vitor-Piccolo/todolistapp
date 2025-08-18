# ToDoList (FastAPI)

Backend simples em FastAPI com frontend estático para gerenciamento de tarefas e cadastro de usuários.

## Estrutura do projeto

```
.
├── .env                         # Variáveis de ambiente (DB, configs)
├── database.db                  # Banco sqlite (exemplo)
├── toDolist.db                  # Outro arquivo de BD (exemplo)
├── pyproject.toml               # Dependências e tasks
├── README.md                    # Este arquivo
├── src/
│   ├── staticFiles/             # Frontend estático
│   │   ├── index.html           # Página principal -> index.html
│   │   └── src/
│   │       ├── css/             # Estilos -> styles.css
│   │       └── js/              # Scripts -> main.js
│   └── todolist/                # Código da aplicação
│       ├── __init__.py
│       ├── main.py              # FastAPI app -> `todolist.main.app`
│       ├── database.py          # Engine & sessão -> `todolist.database.get_session`
│       ├── models.py            # Models ORM -> `todolist.models.UserDB`, `todolist.models.Item`
│       ├── schemas.py           # Schemas Pydantic -> `todolist.schemas.User_Schema`, `todolist.schemas.ToDo_Schema`
│       └── settings.py          # Leitura de .env -> `todolist.settings.Settings`
└── tests/                       # Testes -> tests
```

## Principais funcionalidades

- API FastAPI com endpoints em [`src/todolist/main.py`](src/todolist/main.py) (criação de usuário, endpoints de tarefas).
- Models com SQLAlchemy em [`src/todolist/models.py`](src/todolist/models.py).
- Leitura de configuração via [`todolist.settings.Settings`](src/todolist/settings.py) (usa `.env` por padrão).
- Sessão do banco e criação de tabelas em [`src/todolist/database.py`](src/todolist/database.py) (`create_table` roda na importação).
- Frontend estático (HTML/CSS/JS) em `src/staticFiles/`:
  - Página principal: [src/staticFiles/index.html](src/staticFiles/index.html)
  - Script principal: [src/staticFiles/src/js/main.js](src/staticFiles/src/js/main.js)
  - Estilos: [src/staticFiles/src/css/styles.css](src/staticFiles/src/css/styles.css)

## Como rodar (local)

1. Criar/editar `.env` na raiz (exemplo):
```sh
# .env
DATABASE_URL=sqlite:///./database.db
```

2. Instalar dependências (Poetry ou pip):
```sh
poetry install
# ou
pip install -r requirements.txt
```

3. (Opcional) Criar tabelas manualmente (o projeto chama `create_table()` em import):
```sh
python -c "from src.todolist.database import create_table; create_table()"
# ou use a task definida em pyproject.toml
```

4. Rodar a aplicação:
```sh
# com uvicorn
uvicorn todolist.main:app --reload --port 8001
# ou usando taskip (configurado em pyproject.toml)
task run
```

5. Abrir o frontend:
- Acesse localmente o HTML estático diretamente (quando o app estiver servindo a pasta estática):
  - [src/staticFiles/index.html](src/staticFiles/index.html)

## Comandos úteis (definidos em pyproject.toml)

- task run: inicia a app (ver [pyproject.toml](pyproject.toml))
- task test: executa pytest (ver [pyproject.toml](pyproject.toml))

Consulte [pyproject.toml](pyproject.toml) para os detalhes da configuração e tasks.

## Testes

Execute os testes com:
```sh
pytest
```
Arquivos de testes estão em [tests/](tests/).

## Observações

- Ajuste `DATABASE_URL` no arquivo `.env` conforme seu ambiente (arquivo `.env` na raiz).
- O engine SQL usa a configuração de [`todolist.settings.Settings`](src/todolist/settings.py).
- As rotas e comportamento estão implementados em [`src/todolist/main.py`](src/todolist/main.py) (ponto de partida).
- Bancos sqlite de exemplo: [database.db](database.db) e [toDolist.db](toDolist.db).

## Licença

MIT
```

