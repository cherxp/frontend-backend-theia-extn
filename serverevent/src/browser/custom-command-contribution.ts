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
        registry.registerCommand(DashboardCommands.SHOW_TABS, {
            isEnabled: () => true,
            execute: () => this.showTabs()
        });
    }

    showTabs() {
        this.customTabPanel.showTabs();
    }

}

export namespace DashboardCommands {
    export const DASHBOARD_CATEGORY = 'Dashboard';
    export const SHOW_TABS: Command = {
        id: 'dashboard.show.tabs',
        category: DASHBOARD_CATEGORY,
        label: 'Dashboard : Show Tabs'
    };
}