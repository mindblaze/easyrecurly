# Recurly API Wrapper

[![Build Status](https://travis-ci.org/mindblaze/easyrecurly.png?branch=master)](https://travis-ci.org/mindblaze/easyrecurly)
[![Dependency Status](https://www.versioneye.com/user/projects/53fdecccf4df15018100004f/badge.png)](https://www.versioneye.com/user/projects/53fdecccf4df15018100004f)
[![NPM version](https://badge.fury.io/js/easyrecurly.png)](http://badge.fury.io/js/easyrecurly)

[![NPM stats](https://nodei.co/npm/easyrecurly.png?downloads=true)](https://www.npmjs.org/package/easyrecurly)

A simple and light-weight interface wrapper for <a href="https://docs.recurly.com" target="_blank">Recurly</a>.

## Installation

```
$ npm install easyrecurly
```


## Benefits
	- Very easy to send objects in JSON, xml is generated for you.
	- Complete coverage of the API.
	- Result paging support.


## Configurations
Create a config file similar to this:

```
	module.exports = {
		apiKey: 'Recurly Private API Key',
		subdomain: 'https://example.recurly.com'
	};
```


## Usage
```
	var Recurly = require('easyrecurly');
	var eRecurly = new Recurly(require('./config'));
```


API Calls

## Accounts <a href="https://docs.recurly.com/api/accounts" target="_blank">(Doc Ref)</a>

	eRecurly.accounts.list([filter], callback)

	eRecurly.accounts.create(details, callback)

	eRecurly.accounts.update(accountCode, details, callback)

	eRecurly.accounts.get(accountCode, callback)

	eRecurly.accounts.close(accountCode, callback)

	eRecurly.accounts.reopen(accountCode, callback)
	
	eRecurly.accounts.notes(accountCode, callback)



## Billing Information <a href="https://docs.recurly.com/api/billing-info" target="_blank">(Doc Ref)</a>

	eRecurly.billingInfo.update(accountCode, details, callback) 

	eRecurly.billingInfo.get(accountCode, callback) 

	eRecurly.billingInfo.remove(accountCode, callback) 



## Adjustments <a href="https://docs.recurly.com/api/adjustments" target="_blank">(Doc Ref)</a>

	eRecurly.adjustments.get(accountCode, callback)
  
	eRecurly.adjustments.create(accountCode, details, callback)

	eRecurly.adjustments.remove(uuid, callback)



## Coupons <a href="https://docs.recurly.com/api/coupons" target="_blank">(Doc Ref)</a>

	eRecurly.coupons.list([filter], callback)
	
	eRecurly.coupons.get(couponCode, callback)

	eRecurly.coupons.create(details, callback)

	eRecurly.coupons.deactivate(couponCode, callback)



## Coupon Redemtion <a href="https://docs.recurly.com/api/coupons/coupon-redemption" target="_blank">(Doc Ref)</a>
  
	eRecurly.couponRedemption.redeem(couponCode, details, callback)

	eRecurly.couponRedemption.get(accountCode, callback)

	eRecurly.couponRedemption.remove(accountCode, callback)

	eRecurly.couponRedemption.getByInvoice(invoiceNumber, callback)



## Invoices <a href="https://docs.recurly.com/api/invoices" target="_blank">(Doc Ref)</a>
	eRecurly.invoices.list([filter], callback)
	
	eRecurly.invoices.listByAccount(accountCode, filter, callback)

	eRecurly.invoices.get(invoiceNumber, callback)
  
	eRecurly.invoices.create(accountCode, details, callback)

	eRecurly.invoices.markSuccessful(invoiceNumber, callback)

	eRecurly.invoices.markFailed(invoiceNumber, callback)



## Subscriptions <a href="https://docs.recurly.com/api/subscriptions" target="_blank">(Doc Ref)</a>

	eRecurly.subscriptions.list([filter], callback)
	
	eRecurly.subscriptions.listByAccount(accountCode, callback)

	eRecurly.subscriptions.get(uuid, callback)

	eRecurly.subscriptions.create(details, callback)
  
	eRecurly.subscriptions.update(uuid, details, callback)
  
	eRecurly.subscriptions.cancel(uuid, callback)
  
	eRecurly.subscriptions.reactivate(uuid, callback)
  
	eRecurly.subscriptions.terminate(uuid, refundType, callback)

 	eRecurly.subscriptions.postpone(uuid, nextRenewalDate, callback)
 	
 	eRecurly.subscriptions.preview(details, callback)



## Plans <a href="https://docs.recurly.com/api/plans" target="_blank">(Doc Ref)</a>

	eRecurly.plans.list([filter], callback)

	eRecurly.plans.get(planCode, callback) 
	
	eRecurly.plans.create(details, callback)
  
	eRecurly.plans.update(planCode, details, callback)
  
	eRecurly.plans.remove(planCode, callback)
	


## Plan Add-ons <a href="https://docs.recurly.com/api/plans/add-ons" target="_blank">(Doc Ref)</a>

	eRecurly.planAddons.list(planCode, [filter], callback)

	eRecurly.planAddons.get(planCode, addonCode, callback) 
  
	eRecurly.planAddons.create(planCode, details, callback)
  
	eRecurly.planAddons.update(planCode, addonCode, details, callback)
  
	eRecurly.planAddons.remove(planCode, addonCode, callback)



## Transactions <a href="https://docs.recurly.com/api/transactions" target="_blank">(Doc Ref)</a>

	eRecurly.transactions.list(filter, callback) 

	eRecurly.transactions.listByAccount(accountCode, [filter], callback)

	eRecurly.transactions.get(id, callback)

	eRecurly.transactions.create(details, callback) 

	eRecurly.transactions.refund(id, amount, callback)



## Configuration

* **apiKey (String)** - Private api key for your recurly account.
* **subdomain (String)** - subdomain for your account with recurly, ends with ```.recurly.com```. (No trailing slash)
* **debug (Boolean)** (Default: false) - debug output.



## History

* v0.0.1 (2014-08-27) -- Initial release.



## License

The MIT License (MIT)

Copyright (c) 2014 Talha Asad

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.