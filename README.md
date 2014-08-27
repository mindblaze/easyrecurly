# Recurly API Wrapper

[![Build Status](https://travis-ci.org/mindblaze/easyrecurly.png?branch=master)](https://travis-ci.org/mindblaze/easyrecurly)
[![Dependency Status](https://www.versioneye.com/user/projects/533d32527bae4be0c7000242/badge.png)](https://www.versioneye.com/user/projects/533d32527bae4be0c7000242)
[![NPM version](https://badge.fury.io/js/easyrecurly.png)](http://badge.fury.io/js/easyrecurly)

[![NPM stats](https://nodei.co/npm/easyrecurly.png?downloads=true)](https://www.npmjs.org/package/easyrecurly)

A simple and light-weight interface wrapper for Recurly(https://docs.recurly.com/).

## Installation

```
$ npm install easyrecurly
```

## Configurations
Create a config file similar to this:

```
	module.exports = {
		apiKey: 'Recurly Private API Key',
		subdomain: 'https://example.recurly.com'
	};
```


## Example Usage
```
	var Recurly = require('easyrecurly');
	var eRecurly = new Recurly(require('./config'));
```


Accounts(https://docs.recurly.com/api/accounts)
===============

	recurly.accounts.list([filter], callback)

	recurly.accounts.create(details, callback)

	recurly.accounts.update(accountCode, details, callback)

	recurly.accounts.get(accountCode, callback)

	recurly.accounts.close(accountCode, callback)

	recurly.accounts.reopen(accountCode, callback)
	
	recurly.accounts.notes(accountCode, callback)


Billing Information(https://docs.recurly.com/api/billing-info)
===============

	recurly.billingInfo.update(accountCode, details, callback) 

	recurly.billingInfo.get(accountCode, callback) 

	recurly.billingInfo.remove(accountCode, callback) 


Adjustments(https://docs.recurly.com/api/adjustments)
===============

	recurly.adjustments.get(accountCode, callback)
  
	recurly.adjustments.create(accountCode, details, callback)

	recurly.adjustments.remove(uuid, callback)


Coupons(https://docs.recurly.com/api/coupons)
===============

	recurly.coupons.list([filter], callback)
	
	recurly.coupons.get(couponCode, callback)

	recurly.coupons.create(details, callback)

	recurly.coupons.deactivate(couponCode, callback)


Coupon Redemtion(https://docs.recurly.com/api/coupons/coupon-redemption)
=================
  
	recurly.couponRedemption.redeem(couponCode, details, callback)

	recurly.couponRedemption.get(accountCode, callback)

	recurly.couponRedemption.remove(accountCode, callback)

	recurly.couponRedemption.getByInvoice(invoiceNumber, callback)


Invoices(https://docs.recurly.com/api/invoices)
===============

	recurly.invoices.list([filter], callback)
	
	recurly.invoices.listByAccount(accountcode, filter, callback)

	recurly.invoices.get(invoiceNumber, callback)
  
	recurly.invoices.create(accountCode, details, callback)

	recurly.invoices.markSuccessful(invoiceNumber, callback)

	recurly.invoices.markFailed(invoiceNumber, callback)


Subscriptions(https://docs.recurly.com/api/subscriptions)
===============

	recurly.subscriptions.list([filter], callback)
	
	recurly.subscriptions.listByAccount(accountcode, callback)

	recurly.subscriptions.get(uuid, callback)

	recurly.subscriptions.create(details, callback)
  
	recurly.subscriptions.update(uuid, details, callback)
  
	recurly.subscriptions.cancel(uuid, callback)
  
	recurly.subscriptions.reactivate(uuid, callback)
  
	recurly.subscriptions.terminate(uuid, refundType, callback)

 	recurly.subscriptions.postpone(uuid, nextRenewalDate, callback)
 	
 	recurly.subscriptions.preview(details, callback)


Plans(https://docs.recurly.com/api/plans)
==================

	recurly.plans.list([filter], callback)

	recurly.plans.get(plancode, callback) 
	
	recurly.plans.create(details, callback)
  
	recurly.plans.update(plancode, details, callback)
  
	recurly.plans.remove(plancode, callback)
	

Plan Add-ons(https://docs.recurly.com/api/plans/add-ons)
==================

	recurly.planAddons.list(planCode, [filter], callback)

	recurly.planAddons.get(planCode, addonCode, callback) 
  
	recurly.planAddons.create(planCode, details, callback)
  
	recurly.planAddons.update(planCode, addonCode, details, callback)
  
	recurly.planAddons.remove(planCode, addonCode, callback)


Transactions(https://docs.recurly.com/api/transactions)
===============

	recurly.transactions.list(filter, callback) 

	recurly.transactions.listByAccount(accountCode, [filter], callback)

	recurly.transactions.get(id, callback)

	recurly.transactions.create(details, callback) 

	recurly.transactions.refund(id, amount, callback)


## Configuration

* **apiKey (String)** - Private api key for your recurly account.
* **subdomain (String)** - subdomain for your account with recurly, ends with ```.recurly.com```. (No trailing slash)
* **debug (Boolean)** (Default: false) - chunk till byte number.


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