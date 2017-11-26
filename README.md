## bl-connect
A connecter module for talking to the **bl-api**.

## Before you begin
#### This library requires

```bash
Yarn	1.3+
Angular 4+
```

You can get Angular at: https://angular.io/

You can get the yarn packet-manager at: https://yarnpkg.com/en/docs/install

## Installation
#### bl-model
> The **bl-model** package is neccessary to get the correct output from bl-connect.

> To install bl-model into your own Angular project. Do the following in a Terminal:

```bash
cd path/to/your/own/angular-project
yarn add path/to/your/bl-model-X.X.X.tgz
```
> *where **X** is the version number.*

<br>

#### bl-connect
> To install **bl-connect** to your own Angular project. Do the following in a Terminal:
```bash
cd path/to/your/own/angular-project
yarn add path/to/bl-connect-X.X.X.tgz
```
> *where **X** is the version number.*

<br>
### Important to remember!
To get and post real data you need to have a running instance of the **bl-api**
<br>

## How to use this library

To import this library in your module:
```typescript
	...
	imports: [..., BlConnectModule]
	...
```
Now you can use the services in your components. The services are explained below.
<br>

#### ItemService
> to import this service:

	import {BranchService} from 'bl-connect';

> the methods you can use :
```typescript
get(query?: string): Promise<Item[]>
getById(id: string): Promise<Item>
```
<br>
#### BranchService
> to import this service: 

	import {ItemService} from 'bl-connect';
	
> the methods you can use:

```typescript
get(query?: string): Promise<Branch[]>
getById(id: string): Promise<Branch>
```
<br>
#### OpeningHourService
> to import this service:

	import {OpeningHourService} from 'bl-connect';
	
> the methods you can use:

```typescript
getById(id: string): Promise<OpeningHour>
```
	

