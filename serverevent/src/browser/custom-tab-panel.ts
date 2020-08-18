import { inject, injectable } from 'inversify';
import { TabPanel } from '@theia/core/lib/browser';
import { FileNavigatorWidget } from '@theia/navigator/lib/browser';
//import { ScmContribution } from '@theia/scm/lib/browser/scm-contribution';
import { ScmWidget } from '@theia/scm/lib/browser/scm-widget';
import { SearchInWorkspaceWidget } from '@theia/search-in-workspace/lib/browser/search-in-workspace-widget';
import { GitHistoryWidget } from '@theia/git/lib/browser/history/git-history-widget';
import { GIT_HISTORY_MAX_COUNT } from '@theia/git/lib/browser/history/git-history-contribution';
import { Git } from '@theia/git/lib/common';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { FileStat } from '@theia/filesystem/lib/common';

@injectable()
export class CustomTabPanel extends TabPanel {

    //private scmWidget: Widget | undefined;
    //private searchInWorkspaceWidget: Widget | undefined;

    constructor(
        @inject(FileNavigatorWidget) private readonly fileView: FileNavigatorWidget,
        @inject(ScmWidget) private readonly scmWidget: ScmWidget,
        @inject(SearchInWorkspaceWidget) private readonly searchInWorkspaceWidget: SearchInWorkspaceWidget,
        @inject(GitHistoryWidget) private readonly gitHistoryWidget: GitHistoryWidget,
        @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService
    ) {
        super();
        this.init();
        //this.showTabs();
    }

    public showTabs() {
        this.addPhysicalFileView();
        this.addScmView();
        this.addSearchView();
        this.addGitHistory();
    }

    private init() {
        this.id = 'xpressTabBar';
        this.tabBar.addClass('theia-app-centers');
        this.tabBar.addClass('theia-app-bottom');
    }

    private addPhysicalFileView() {
        this.fileView.title.label = 'Files';
        this.fileView.title.caption = 'Files';
        this.fileView.title.iconClass = '';
        this.addWidget(this.fileView);
    }

    private addScmView() {
        this.addWidget(this.scmWidget);
    }

    private addSearchView() {
        this.addWidget(this.searchInWorkspaceWidget);
    }

    private async addGitHistory() {
        this.addWidget(this.gitHistoryWidget);

        var roots = await this.workspaceService.roots;
        if(roots && roots.length > 0) {
            var projectNode: FileStat = roots[0];
            var uri: string | undefined = projectNode.uri;

            const options: Git.Options.Log = {
                uri,
                maxCount: GIT_HISTORY_MAX_COUNT,
                shortSha: true
            };
            await this.gitHistoryWidget.setContent(options);
        }
    }
}