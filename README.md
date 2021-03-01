# bl-connect

A connecter module for talking to the **bl-api** from a Angular application. It
should be viewed as a communication module only. Every HTTP request to `bl-api`
is done through `bl-connect`.

For more documentation [please read bl-doc](https://github.com/boklisten/bl-doc/blob/master/README.md)

# Requirements

-   [Angular 5+](https://angular.io)
-   [bl-model](https://github.com/boklisten/bl-model)
-   [NPM](https://npmjs.org)

# How to install

> To install **bl-connect** to your own Angular project. Do the following in a Terminal:

```bash
cd path/to/your/own/angular-project
npm install bl-connect
```

### Important to remember!

To get and post real data you need to have a running instance of the **bl-api**

<br>

# How to use this library

To import this library in your module:

```typescript
imports: [..., BlConnectModule]
```

Now you can use the services in your components. The services are explained below.

## Some example services

### ItemService

> to import this service:

    import {ItemService} from 'bl-connect';

> the methods you can use :

```typescript
get(query?: string): Promise<Item[]>
getById(id: string): Promise<Item>
```

### BranchService

> to import this service:

    import {BranchService} from 'bl-connect';

> the methods you can use:

```typescript
get(query?: string): Promise<Branch[]>
getById(id: string): Promise<Branch>
```

### OpeningHourService

> to import this service:

    import {OpeningHourService} from 'bl-connect';

> the methods you can use:

```typescript
getById(id: string): Promise<OpeningHour>
```

### CustomerItemService

> to import this service:

    import {CustomerItemService} from 'bl-connect';

> the methods you can use:

```typescript
getById(id: string): Promise<CustomerItemService>
add(customerItem: CustomerItem): Promise<CustomerItem>
update(id: string, data: any): Promise<CustomerItem>
```

### OrderService

> to import this service:

    import {OrderService} from 'bl-connect';

> the methods you can use:

```typescript
getById(id: string): Promise<Order>
add(order: Order): Promise<Order>
update(id: string, data: any): Promise<Order>
```

## Error handling

When you use a service and that service rejects with an error you get a object of the type **_BlApiError_**.
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
```
