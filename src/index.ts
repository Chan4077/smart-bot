import { Application } from 'probot';
import { commands } from './command';

export = (app: Application) => {
	// Your code here
	app.log('Yay, the app was loaded!');
	app.on('issues.opened', async context => {
		// Log the payload of the new issue
		context.log(context.payload);
		context.log.debug(context.issue({ body: 'Hello, world' }));
		return context.github.issues.createComment(context.issue({ body: 'Hello, world!' })).then(() => { });
	});
	commands(app, 'addLabel', (context, args) => {
		context.github.issues.addLabels(context.issue({ labels: args.arguments.split(',') })).then(_ => {
			context.log.info(`Successfully added labels: ${args.arguments.split(',')}`);
		}, error => {
			const errorMsg = '> :no_entry_sign: ERROR\n'
				+ '> Could not add the labels "' + args.arguments.split(',') + '".\n'
				+ '> Reason: ' + JSON.parse(error).message + '\n'
				+ '> More info: [Github Developer docs](' + JSON.parse(error).documentation_url + ')\n\n'
				+ '> Note: This alert can be disabled in your repository\'s `config.yml` file by setting the `showErrorAlerts` property to `false`';
			context.github.issues.createComment(context.issue({ body: errorMsg }));
		});
	});
	commands(app, 'removeLabel', (context, args) => {
		if (args.arguments) {
			// const arguments = args.arguments.split(',');
			for (let i = 0; i < args.arguments.split(',').length; i++) {
				context.github.issues.removeLabel(context.issue({ name: args.arguments.split(',')[i] })).then(_ => {
					context.log.info(`Successfully removed label ${args.arguments.split(',')[i]}`);
				}, error => {
					context.log(error);
					const errorMsg = '> :no_entry_sign: ERROR\n'
						+ '> Could not delete the label "' + args.arguments.split(',')[i] + '".\n'
						+ '> Reason: ' + JSON.parse(error).message + '\n'
						+ '> More info: [Github Developer docs](' + JSON.parse(error).documentation_url + ')\n\n'
						+ '> Note: This alert can be disabled in your repository\'s `config.yml` file by setting the `showErrorAlerts` property to `false`';
					context.github.issues.createComment(context.issue({ body: errorMsg }));
				})
			}
		} else {
			const infoMsg = '> :information_source: INFO\n'
				+ '> Usage:\n'
				+ '> `/removeLabel [label1,label2]`\n'
				+ '> Notes:\n'
				+ '> Please separate labels by commas\n'
				+ '> Description:\n'
				+ '> Removes the specified labels.\n'
				+ '> For more info, view the [docs on `removeLabel`](https://chan4077.github.io/smart-bot/commands/removeLabel)';
			context.github.issues.createComment(context.issue({ body: infoMsg}));
		}
	});
	commands(app, 'removeAllLabels', (context, args) => {
		context.github.issues.removeAllLabels(context.issue()).then(_ => {
			context.log.info('Successfully removed all labels!');
		}, error => {
			context.log(error);
			const errorMsg = '> :no_entry_sign: ERROR\n'
				+ '> Could not remove all labels.\n'
				+ '> Reason: ' + JSON.parse(error).message + '\n'
				+ '> More info: [Github Developer docs](' + JSON.parse(error).documentation_url + ')\n\n'
				+ '> Note: This alert can be disabled in your repository\'s `config.yml` file by setting the `showErrorAlerts` property to `false`';
			context.github.issues.createComment(context.issue({ body: errorMsg }));
		});
	})
	// For more information on building apps:
	// https://probot.github.io/docs/

	// To get your app running against GitHub, see:
	// https://probot.github.io/docs/development/
}
