import { connect, connection } from 'mongoose';
export class DbMongo {
	constructor() {}
	connect(
		hostName: string,
		dbName: string,
		userName: string = '',
		password: string = '',
		port?: number
	) {
		let connectionUri = `mongodb://${hostName}:${port}/${dbName}`;
		if (userName && password) {
			connectionUri = `mongodb+srv://${userName}:${password}@${hostName}/${dbName}`;
		}
		connect(connectionUri, (error: any) => {
			if (error) {
				console.log(error);
				console.log('Database connection failed');
			} else {
				console.log('Connected with database');
			}
		});
	}
}
// export const MonStatConnection = connection.readyState;
