import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, Command } from "@theia/core/lib/common/command";
import { CustomTabPanel } from "./custom-tab-panel";

@injectable()
export class CustomCommandContribution implements CommandContribution {

    constructor(
        @inject(CustomTabPanel) protected readonly customTabPanel: CustomTabPanel
    ) {

    }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(CustomTabPanelCommands.SHOW_TABS, {
            isEnabled: () => true,
            execute: () => this.showTabs()
        });
    }

    showTabs() {
        this.customTabPanel.showTabs();
    }

}

export namespace CustomTabPanelCommands {
    export const CUSTOM_TABPANEL_CATEGORY = 'TabPanel';
    export const SHOW_TABS: Command = {
        id: 'TabPanel.show.tabs',
        category: CUSTOM_TABPANEL_CATEGORY,
        label: 'TabPanel : Show Tabs'
    };
}