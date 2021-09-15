import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { DbMongo } from './config/mongoDb.conn';
import { Server } from 'http';
import { MainApi } from './routes';

const health = require('@cloudnative/health-connect');
let healthCheck = new health.HealthChecker();
import {
	Mongo_Password,
	MongoCluster,
	MongoDbName,
	Mongo_User_Name,
	Mongo_Db_Port,
} from './utils/constant';
import { error } from 'console';
let server: Server | null = null;
const PORT = process.env.PORT || 5000;

function initApplication(): express.Application {
	const app = express();
	app.use(morgan('tiny'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(express.static('public'));
	app.use(MainApi);
	app.use(
		'/swagger',
		swaggerUi.serve,
		swaggerUi.setup(undefined, {
			swaggerOptions: {
				url: '/swagger.json',
			},
		})
	);
	new DbMongo().connect(MongoCluster, '', '', MongoDbName, Mongo_Db_Port);

	app.use((error: any, req: Request, res: Response, next: NextFunction) => {
		res.locals.message = error.message;
		const status = error.statusCode || 500;
		res.locals.status = status;
		res.locals.error = req.app.get('env') === 'development' ? error : {};
		return res.json({
			error: {
				message: error.message,
			},
		});
	});

	app.use('/health', health.LivenessEndpoint(healthCheck));
	app.use('/ready', health.ReadinessEndpoint(healthCheck));
	return app;
}
function start() {
	const app = initApplication();
	server = app.listen(PORT, () => {
		console.log(`Server is listening at http://localhost:${PORT}`);
	});
}
start();
