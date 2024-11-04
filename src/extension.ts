import * as vscode from 'vscode';

class GlobalFlag {
	private static instance: GlobalFlag;
	private flag: boolean;

	private constructor() {
		this.flag = false;
	}

	public get(): boolean {
		return this.flag;
	}

	public set(value: boolean): void {
		this.flag = value;
	}

	public static getInstance(): GlobalFlag {
		if (!GlobalFlag.instance) {
			GlobalFlag.instance = new GlobalFlag();
		}
		return GlobalFlag.instance;
	}

}

const isTerminalOpened = GlobalFlag.getInstance();

export function activate(context: vscode.ExtensionContext) {
	const initialConfig = vscode.workspace.getConfiguration("autoHide");

	function hideBasedOnConfig(config: vscode.WorkspaceConfiguration) {
		if (config.autoHidePanel) {
			setTimeout(function () {
				vscode.commands.executeCommand("workbench.action.closePanel");
				isTerminalOpened.set(false);
			}, config.panelDelay);
		}
	}

	isTerminalOpened.set(vscode.window.terminals.length > 0);

	vscode.window.onDidOpenTerminal(terminal => {
		isTerminalOpened.set(true);
	});

	vscode.window.onDidCloseTerminal(terminal => {
		isTerminalOpened.set(false);
	});

	vscode.window.onDidChangeTextEditorSelection(selection => {
		if (isTerminalOpened.get() === true) {
			hideBasedOnConfig(vscode.workspace.getConfiguration("autoHide"));
		};
	});

	vscode.window.onDidChangeActiveTextEditor(editor => {
		if (isTerminalOpened.get() === true) {
			hideBasedOnConfig(vscode.workspace.getConfiguration("autoHide"));
		};
	});

	vscode.workspace.onDidChangeTextDocument(document => {
		if (isTerminalOpened.get() === true) {
			hideBasedOnConfig(vscode.workspace.getConfiguration("autoHide"));
		};
	});

	vscode.workspace.onDidOpenTextDocument(document => {
		if (isTerminalOpened.get() === true) {
			hideBasedOnConfig(vscode.workspace.getConfiguration("autoHide"));
		};
	});
}

// This method is called when your extension is deactivated
export function deactivate() { }
