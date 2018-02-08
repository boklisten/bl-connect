# bl-connect
A connecter module for talking to the **bl-api** from a Angular application.

## Before you begin
### This library requires

```bash
Angular 5+
```

You can get Angular at: https://angular.io/

### bl-model
> The **bl-model** package is a peerDependency to this project. 

> To install bl-model into your own Angular project. Do the following in a Terminal:

```bash
cd path/to/your/own/angular-project
npm install bl-model 
```

<br>

## Installation

### bl-connect
> To install **bl-connect** to your own Angular project. Do the following in a Terminal:
```bash
cd path/to/your/own/angular-project
npm install bl-connect
```

<br>

### Important to remember!
To get and post real data you need to have a running instance of the **bl-api**

<br>

## How to use this library

To import this library in your module:

```typescript
imports: [..., BlConnectModule]
```

Now you can use the services in your components. The services are explained below.
<br>

### ItemService
> to import this service:

	import {ItemService} from 'bl-connect';

> the methods you can use :
```typescript
get(query?: string): Promise<Item[]>
getById(id: string): Promise<Item>
```
<br>

### BranchService
> to import this service: 

	import {BranchService} from 'bl-connect';
	
> the methods you can use:

```typescript
get(query?: string): Promise<Branch[]>
getById(id: string): Promise<Branch>
```
<br>

### OpeningHourService
> to import this service:

	import {OpeningHourService} from 'bl-connect';
	
> the methods you can use:

```typescript
getById(id: string): Promise<OpeningHour>
```
<br>

## Error handling
When you use a service and that service rejects with an error you get a object of the type ***BlApiError***. 
The error classes are provided by **bl-model** and are therefore easy to understand.
We have four different types of BlApiErrors that bl-connect services throws, under is a description for all of them:

#### BlApiLoginRequiredError
Used when the request requires a login and no valid access token is found. The user needs to login to get this document.

#### BlApiPermissionDeniedError
Used when the request is valid, but the user lacks the given permission for this endpoint.

#### BlApiNotFoundError
Used when the document asked for is not found.

#### BlApiError
This is error is thrown if none of the above errors is applicable.


### Example of error handling:
```typescript

myMethod() {
	
	this.itemService.get().then((items: Item[]) => {
		
		//do something	
		
	}).catch((apiErr: BlApiError) => {
        if (apiErr instanceof BlApiLoginRequiredError) {
        	// do something with login error 
        }
        
        if (apiErr instanceof BlApiPermissionDeniedError) {
        	//do something with permission denied error 
        }
        
        if (apiErr instanceof BlApiNotFoundError) {
        	//do something with document not found error 
        }
        
        if (apiErr instanceof BlApiError) {
        	// do something with the general error
        }
	}
}



