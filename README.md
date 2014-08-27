# Recurly API Wrapper

[![Build Status](https://travis-ci.org/mindblaze/easyrecurly.png?branch=master)](https://travis-ci.org/mindblaze/easyrecurly)
[![Dependency Status](https://www.versioneye.com/user/projects/533d32527bae4be0c7000242/badge.png)](https://www.versioneye.com/user/projects/533d32527bae4be0c7000242)
[![NPM version](https://badge.fury.io/js/easyrecurly.png)](http://badge.fury.io/js/easyrecurly)

[![NPM stats](https://nodei.co/npm/easyrecurly.png?downloads=true)](https://www.npmjs.org/package/easyrecurly)

A simple and light-weight interface wrapper for <a href="https://docs.recurly.com/)" target="_blank">Recurly</a>.

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


## Usage
```
	var Recurly = require('easyrecurly');
	var eRecurly = new Recurly(require('./config'));
```

Next you can invoke RESTful calls as below.


## <a href="https://docs.recurly.com/api/accounts" target="_blank">Accounts</a>

	eRecurly.accounts.list([filter], callback)

	eRecurly.accounts.create(details, callback)

	eRecurly.accounts.update(accountCode, details, callback)

	eRecurly.accounts.get(accountCode, callback)

	eRecurly.accounts.close(accountCode, callback)

	eRecurly.accounts.reopen(accountCode, callback)
	
	eRecurly.accounts.notes(accountCode, callback)


## <a href="https://docs.recurly.com/api/billing-info" target="_blank">Billing Information</a>

	eRecurly.billingInfo.update(accountCode, details, callback) 

	eRecurly.billingInfo.get(accountCode, callback) 

	eRecurly.billingInfo.remove(accountCode, callback) 


## <a href="https://docs.recurly.com/api/adjustments" target="_blank">Adjustments</a>

	eRecurly.adjustments.get(accountCode, callback)
  
	eRecurly.adjustments.create(accountCode, details, callback)

	eRecurly.adjustments.remove(uuid, callback)


## <a href="https://docs.recurly.com/api/coupons" target="_blank">Coupons</a>

	eRecurly.coupons.list([filter], callback)
	
	eRecurly.coupons.get(couponCode, callback)

	eRecurly.coupons.create(details, callback)

	eRecurly.coupons.deactivate(couponCode, callback)


## <a href="https://docs.recurly.com/api/coupons/coupon-redemption" target="_blank">Coupon Redemtion</a>
  
	eRecurly.couponRedemption.redeem(couponCode, details, callback)

	eRecurly.couponRedemption.get(accountCode, callback)

	eRecurly.couponRedemption.remove(accountCode, callback)

	eRecurly.couponRedemption.getByInvoice(invoiceNumber, callback)


## <a href="https://docs.recurly.com/api/invoices" target="_blank">Invoices</a>
	eRecurly.invoices.list([filter], callback)
	
	eRecurly.invoices.listByAccount(accountcode, filter, callback)

	eRecurly.invoices.get(invoiceNumber, callback)
  
	eRecurly.invoices.create(accountCode, details, callback)

	eRecurly.invoices.markSuccessful(invoiceNumber, callback)

	eRecurly.invoices.markFailed(invoiceNumber, callback)


## <a href="https://docs.recurly.com/api/subscriptions" target="_blank">Subscriptions</a>

	eRecurly.subscriptions.list([filter], callback)
	
	eRecurly.subscriptions.listByAccount(accountcode, callback)

	eRecurly.subscriptions.get(uuid, callback)

	eRecurly.subscriptions.create(details, callback)
  
	eRecurly.subscriptions.update(uuid, details, callback)
  
	eRecurly.subscriptions.cancel(uuid, callback)
  
	eRecurly.subscriptions.reactivate(uuid, callback)
  
	eRecurly.subscriptions.terminate(uuid, refundType, callback)

 	eRecurly.subscriptions.postpone(uuid, nextRenewalDate, callback)
 	
 	eRecurly.subscriptions.preview(details, callback)


## <a href="https://docs.recurly.com/api/plans" target="_blank">Plans</a>

	eRecurly.plans.list([filter], callback)

	eRecurly.plans.get(plancode, callback) 
	
	eRecurly.plans.create(details, callback)
  
	eRecurly.plans.update(plancode, details, callback)
  
	eRecurly.plans.remove(plancode, callback)
	

## <a href="https://docs.recurly.com/api/plans/add-ons" target="_blank">Plan Add-ons</a>

	eRecurly.planAddons.list(planCode, [filter], callback)

	eRecurly.planAddons.get(planCode, addonCode, callback) 
  
	eRecurly.planAddons.create(planCode, details, callback)
  
	eRecurly.planAddons.update(planCode, addonCode, details, callback)
  
	eRecurly.planAddons.remove(planCode, addonCode, callback)


## <a href="https://docs.recurly.com/api/transactions" target="_blank">Transactions</a>

	eRecurly.transactions.list(filter, callback) 

	eRecurly.transactions.listByAccount(accountCode, [filter], callback)

	eRecurly.transactions.get(id, callback)

	eRecurly.transactions.create(details, callback) 

	eRecurly.transactions.refund(id, amount, callback)


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