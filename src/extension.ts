import * as vscode from 'vscode';
import { TextEditorSelectionChangeKind } from 'vscode';

class GlobalFlag {
	private static instance: GlobalFlag;
	private flag: boolean;

	private constructor() {
		this.flag = false;
	}

	public static getInstance(): GlobalFlag {
		if (!GlobalFlag.instance) {
			GlobalFlag.instance = new GlobalFlag();
		}
		return GlobalFlag.instance;
	}

	public getFlag(): boolean {
		return this.flag;
	}

	public setFlag(value: boolean): void {
		this.flag = value;
	}
}

const globalFlag = GlobalFlag.getInstance();

export function activate(context: vscode.ExtensionContext) {
	console.log(context.extension.extensionKind);


	vscode.window.onDidOpenTerminal(event => {
		console.log("openTermian", event);
	});

	vscode.window.onDidCloseTerminal(event => {
		console.log("closeTer", event);
	});


	vscode.window.onDidChangeTextEditorSelection(selection => {
		console.log("onDidChangeTextEditorSelection");

		const activeEditor = selection.textEditor;

		// if (!activeEditor) { return; }

		console.log("active");

		const path = activeEditor.document.fileName;
		const pathIsFile = path.includes(".") || path.includes("\\") || path.includes("/");
		const scheme = selection.textEditor.document.uri.scheme;
		const trigger_event = selection.kind === (TextEditorSelectionChangeKind.Mouse || TextEditorSelectionChangeKind.Keyboard);

		if (trigger_event) {
			// console.log("trigger_event");

			setTimeout(function () {
				vscode.commands.executeCommand("workbench.action.closePanel");
			}, 300);
		}

	});

	vscode.window.onDidChangeActiveTextEditor(event => {
		console.log("onDidChangeActiveTextEditor");

	// event.

		if (!event) {
			console.log("yes editor");
		} else {
			console.log("no editor");
		}
	});

	vscode.workspace.onDidChangeTextDocument(handleChange => {
		console.log("onDidChangeTextDocument", handleChange);
	});
}

// This method is called when your extension is deactivated
export function deactivate() { }
