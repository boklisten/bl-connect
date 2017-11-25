# bl-connect
A connecter module for talking to the bl api. 
This module requires that you have the bl-model package installed.
It also requires a running instance of the bl-api. 

##Before you begin
#####This project requires
>1. Angular 4+ https://angular.io/ 
>2. yarn https://yarnpkg.com/en/docs/install

##Installation
The Bl-model package is neccessary to get the correct output of the api calls. 

Inside your Angular project, please run the following code to install all you need for Bl-model and Bl-connect to run

	yarn add path/to/bl-model

	yarn add path/to/bl-connect



And now you are good to go!


##To use this library 

To import this library in your module:

	...
	imports: [..., BlConnectModule]
	...
	
Now you can use the services in your components. The services are explained below.

####ItemService
to import this service:

	import {BranchService} from 'bl-connect';

the methods you can use :

	get(query?: string): Promise<Item[]>
	getById(id: string): Promise<Item>
	
####BranchService
to import this service: 

	import {ItemService} from 'bl-connect';
	
the methods you can use:

	get(query?: string): Promise<Branch[]>
	getById(id: string): Promise<Branch>

####OpeningHourService
to import this service:

	import {OpeningHourService} from 'bl-connect';
	
the methods you can use:

	getById(id: string): Promise<OpeningHour>
	
	

