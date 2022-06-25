import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { 
  ICommandPalette,
  MainAreaWidget
} from '@jupyterlab/apputils';
import {
  Widget
} from '@lumino/widgets';
import JSONEditor from "jsoneditor";
import 'jsoneditor/dist/jsoneditor.css'

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter_lab_test:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: async (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyter_lab_test is activated!');
    
    const content = new Widget();
    const widget = new MainAreaWidget({content});
    widget.id = 'apod-jupyterlab'; 
    widget.title.label = 'Astronomy Picture';
    widget.title.closable = true; 

    let container = document.createElement('div')
    container.setAttribute("id", "jsoneditor")

    const options = {};
    const editor = new JSONEditor(container, options);

    // set json
    const initialJson = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": {"a": "b", "c": "d"},
        "String": "Hello World"
    }
    editor.set(initialJson)

    // get json
    //const updatedJson = editor.get()

    content.node.appendChild(container)


    const command: string = 'adop:open';
    app.commands.addCommand(command, {
      label: 'Random Astronomy Picture',
      execute: () => {
        if (!widget.isAttached) {
          app.shell.add(widget, 'main')
        }

        app.shell.activateById(widget.id)
      }
    });

    palette.addItem({ command, category: 'Tutorial' });
  }
};


export default plugin;
