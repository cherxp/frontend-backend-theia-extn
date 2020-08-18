import { ContainerModule } from 'inversify';
import { ServereventWidget } from './serverevent-widget';
import { ServereventContribution } from './serverevent-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory, WebSocketConnectionProvider } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';
import { TestServer, testPath, ReconnectingFileSystemWatcherServer, TestServerProxy } from '../common/test-protocol';

import { FILE_NAVIGATOR_ID } from '@theia/navigator/lib/browser/navigator-widget';
import { CustomTabPanel } from './custom-tab-panel';
import { CommandContribution } from '@theia/core/lib/common/command';
import { CustomCommandContribution } from './custom-command-contribution';

export default new ContainerModule(bind => {

    bind(TestServerProxy).toDynamicValue(ctx =>
        WebSocketConnectionProvider.createProxy(ctx.container, testPath)
    );
    bind(TestServer).to(ReconnectingFileSystemWatcherServer);
        bindViewContribution(bind, ServereventContribution);

        
    bind(FrontendApplicationContribution).toService(ServereventContribution);
    bind(ServereventWidget).toSelf().inSingletonScope();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: ServereventWidget.ID,
        createWidget: () => ctx.container.get<ServereventWidget>(ServereventWidget)
    })).inSingletonScope();

    bind(CustomTabPanel).toSelf();
    bind(WidgetFactory).toDynamicValue(context => ({
        id: FILE_NAVIGATOR_ID,
        createWidget: () => context.container.get(CustomTabPanel)
    }));

    bind(CommandContribution).to(CustomCommandContribution).inSingletonScope();
});
