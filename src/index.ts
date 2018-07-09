import { Application } from 'probot'

export = (app: Application) => {
	// Your code here
	app.log('Yay, the app was loaded!');
	app.on('issues.opened', async context => {
		// Log the payload of the new issue
		context.log(context.payload);
		context.log.debug(context.issue({ body: 'Hello, world' }));
		return context.github.issues.createComment(context.issue({ body: 'Hello, world!' })).then(() => { });
	})
	// For more information on building apps:
	// https://probot.github.io/docs/

	// To get your app running against GitHub, see:
	// https://probot.github.io/docs/development/
}
