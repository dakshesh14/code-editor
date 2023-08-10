import uuid
import random

# local imports
from .constants import pre_prefixes, prefixes, suffixes


def get_uuid(query_len: int = 8) -> str:
    """ Returns a random uuid4 string of length query_len """
    return str(uuid.uuid4())[:query_len]


def get_random_name(
        pre_prefixes_rarity: float = 0.2,
) -> str:
    """
    This function returns a random animal & food name.

    Parameters:
        pre_prefixes_rarity (float): The probability of a pre-prefix being added to the name. Defaults to 0.2.

    Returns:
        str: A random animal & food name with a pre-prefix if pre_prefixes_rarity is met.

    """

    name = f"{random.choice(prefixes)}{random.choice(suffixes)}"
    if random.random() < pre_prefixes_rarity:
        name = f"{random.choice(pre_prefixes)}{name}"

    return name


def get_cpp_template() -> str:
    """ Returns a CPP template """
    return """
            #include <iostream>
            using namespace std;

            int main() {
                cout << "Hello World!";
                return 0;
            } """


def get_react_code_content():
    return {
        "jsx": """
            // no need to import component, css, etc.. in the component
            // you must have App component in order to render the react app
            
            const App = () => {
                return (
                    <div>
                        <h1>Hello World</h1>
                    </div>
                )
            }            
        """,
        "css": """
            body {
                margin: 0;
                padding: 0;
                min-height: 100vh;
                min-width: 100vw;
                box-sizing: border-box;
                background-color: #282c34;
                color: white;
                font-family: Arial, Helvetica, sans-serif;
            }
        """
    }


def create_react_body(
        css_file_content: list,
        js_files_content: list,
) -> str:
    """ This function can be used to get react code. This code can be directly 
    used in browser console without any need of npm or nodejs installation.

    Returns:
        str: React code.
    """

    return f"""
        <html>
            <head>
                <title>React App</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <style>
                    {"".join([file.content for file in css_file_content])}                    
                </style>
            </head>
            <body>
                <div id="root" />

                
                <script src="https://unpkg.com/@babel/standalone@7.12.4/babel.min.js"></script>
                <!-- babel is required in order to parse JSX -->

                <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
                <!-- import react.js -->

                <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"> </script>

                <script type='text/babel'>
                    {"".join([file.content for file in js_files_content])}
                </script>

                <script type='text/babel'>
                    var mountNode = document.getElementById('root');
                    ReactDOM.render(<App />, mountNode);
                </script>
            </body>
        </html>
    """
