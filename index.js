var utility = require('./lib/utility'),
    client = require('./lib/client'),
    endpoints = require('./lib/endpoints'),
    xml2js = require('xml2js'),
    xmlBuilder = new xml2js.Builder({xmldec: {version: '1.0', encoding: 'UTF-8'}}),
    async = require('async'),
    extend = require('extend');

var recurly = function(config) {
  var clientObj = new client(config);
  
  /* Doc: https://docs.recurly.com/api/accounts */
  this.accounts = {
    list: function(filter, cb) {
      clientObj.request(utility.addQueryParams(endpoints.accounts.list, filter), cb);
    },
    get: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.accounts.get, {account_code: accountCode}), cb);
    },
    create: function(obj, cb) {
      clientObj.request(endpoints.accounts.create, xmlBuilder.buildObject(obj), cb);
    },
    update: function(accountCode, obj, cb) {
      clientObj.request(utility.addParams(endpoints.accounts.update, {account_code: accountCode}), xmlBuilder.buildObject(obj), cb);
    },
    close: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.accounts.close, {account_code: accountCode}), cb);
    },
    reopen: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.accounts.reopen, {account_code: accountCode}), cb);
    },
    notes: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.accounts.notes, {account_code: accountCode}), cb);
    }
  };
  
  /* Doc: https://docs.recurly.com/api/adjustments */
  this.adjustments = {
    list: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.adjustments.list, {account_code: accountCode}), cb);
    },
    get: function(uuid, filters, cb) {
      if (typeof filters == 'function') {
        cb = filters;
        filters = null;
      }
      var paramObj = {uuid: uuid};
      if (filters) paramObj = extend(true, paramObj, filters);
      clientObj.request(utility.addParams(endpoints.adjustments.get, paramObj), cb);
    },
    create: function(accountCode, obj, cb) {
      clientObj.request(utility.addParams(endpoints.adjustments.create, {account_code: accountCode}), xmlBuilder.buildObject(obj), cb);
    },
    remove: function(uuid, cb) {
      clientObj.request(utility.addParams(endpoints.adjustments.remove, {uuid: uuid}), cb);
    }
  };
  
  /* Doc: https://docs.recurly.com/api/billing-info */
  this.billingInfo = {
    get: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.billingInfo.get, {account_code: accountCode}), cb);
    },
    update: function(accountCode, obj, cb) {
      clientObj.request(utility.addParams(endpoints.billingInfo.update, {account_code: accountCode}), xmlBuilder.buildObject(obj), cb);
    },
    remove: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.billingInfo.remove, {account_code: accountCode}), cb);
    }
  };

  /* Doc: https://docs.recurly.com/api/coupons */
  this.coupons = {
    list: function(filter, cb) {
      clientObj.request(utility.addQueryParams(endpoints.coupons.list, filter), cb);
    },
    get: function(couponCode, cb) {
      clientObj.request(utility.addParams(endpoints.coupons.get, {coupon_code: couponCode}), cb);
    },
    create: function(obj, cb) {
      clientObj.request(endpoints.coupons.create, xmlBuilder.buildObject(obj), cb);
    },
    deactivate: function(couponCode, cb) {
      clientObj.request(utility.addParams(endpoints.coupons.deactivate, {coupon_code: couponCode}), cb);
    }
  };

  /* Doc: https://docs.recurly.com/api/coupons/coupon-redemption */
  this.couponRedemption = {
    redeem: function(couponCode, obj, cb) {
      clientObj.request(utility.addParams(endpoints.couponRedemption.redeem, {coupon_code: couponCode}), xmlBuilder.buildObject(obj), cb);
    },
    get: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.couponRedemption.get, {account_code: accountCode}), cb);
    },
    remove: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.couponRedemption.remove, {account_code: accountCode}), cb);
    },
    getByInvoice: function(invoiceNumber, cb) {
      clientObj.request(utility.addParams(endpoints.couponRedemption.getByInvoice, {invoice_number: invoiceNumber}), cb);
    }
  };

  /* Doc: https://docs.recurly.com/api/invoices */
  this.invoices = {
    list: function(filter, cb) {
      clientObj.request(utility.addQueryParams(endpoints.invoices.list, filter), cb);
    },
    listByAccount: function(accountCode, filter, cb) {
      clientObj.request(utility.addParams(utility.addQueryParams(endpoints.invoices.listByAccount, filter), {account_code: accountCode}), cb);
    },
    get: function(invoiceNumber, cb) {
      clientObj.request(utility.addParams(endpoints.invoices.get, {invoice_number: invoiceNumber}), cb);
    },
    create: function(accountCode, obj, cb) {
      clientObj.request(utility.addParams(endpoints.invoices.create, {account_code: accountCode}), xmlBuilder.buildObject(obj), cb);
    },
    markSuccessful: function(invoiceNumber, cb) {
      clientObj.request(utility.addParams(endpoints.invoices.markSuccessful, {invoice_number: invoiceNumber}), cb);
    },
    markFailed: function(invoiceNumber, cb) {
      clientObj.request(utility.addParams(endpoints.invoices.markFailed, {invoice_number: invoiceNumber}), cb);
    },
    refund: function(invoiceNumber, cb) {
      clientObj.request(utility.addParams(endpoints.invoices.refund, {invoice_number: invoiceNumber}), cb);
    },
    offline: function(invoiceNumber, cb) {
      clientObj.request(utility.addParams(endpoints.invoices.offline, {invoice_number: invoiceNumber}), cb);
    }
    
  };

  /* Doc: https://docs.recurly.com/api/plans */
  this.plans = {
    list: function(cb, filter) {
      clientObj.request(utility.addQueryParams(endpoints.plans.list, filter), cb);
    },
    get: function(planCode, cb) {
      clientObj.request(utility.addParams(endpoints.plans.get, {plan_code: planCode}), cb);
    },
    create: function(obj, cb) {
      clientObj.request(endpoints.plans.create, xmlBuilder.buildObject(obj), cb);
    },
    update: function(planCode, obj, cb) {
      clientObj.request(utility.addParams(endpoints.plans.update, {plan_code: planCode}), xmlBuilder.buildObject(obj), cb);
    },
    remove: function(planCode, cb) {
      clientObj.request(utility.addParams(endpoints.plans.remove, {plan_code: planCode}), cb);
    }
  };

  /* Doc: https://docs.recurly.com/api/plans/add-ons */
  this.planAddons = {
    list: function(planCode, cb, filter) {
      clientObj.request(utility.addParams(utility.addQueryParams(endpoints.planAddons.list, filter), {plan_code: planCode}), cb);
    },
    get: function(planCode, addonCode, cb) {
      clientObj.request(utility.addParams(endpoints.planAddons.get, {plan_code: planCode, addon_code: addonCode}), cb);
    },
    create: function(planCode, obj, cb) {
      clientObj.request(utility.addParams(endpoints.planAddons.create, {plan_code: planCode}), xmlBuilder.buildObject(obj), cb);
    },
    update: function(planCode, addonCode, obj, cb) {
      clientObj.request(utility.addParams(endpoints.planAddons.update, {plan_code: planCode, add_on_code: addonCode}), xmlBuilder.buildObject(obj), cb);
    },
    remove: function(planCode, addonCode, cb) {
      clientObj.request(utility.addParams(endpoints.planAddons.remove, {plan_code: planCode, add_on_code: addonCode}), cb);
    }
  };

  /* Doc: https://docs.recurly.com/api/subscriptions */
  this.subscriptions = {
    list: function(cb, filter) {
      clientObj.request(utility.addQueryParams(endpoints.subscriptions.list, filter), cb);
    },
    listByAccount: function(accountCode, cb) {
      clientObj.request(utility.addParams(endpoints.subscriptions.listByAccount, {account_code: accountCode}), cb);
    },
    get: function(uuid, cb) {
      clientObj.request(utility.addParams(endpoints.subscriptions.get, {uuid: uuid}), cb);
    },
    create: function(obj, cb) {
      clientObj.request(endpoints.subscriptions.create, xmlBuilder.buildObject(obj), cb);
    },
    update: function(uuid, obj, cb) {
      clientObj.request(utility.addParams(endpoints.subscriptions.update, {uuid: uuid}), xmlBuilder.buildObject(obj), cb);
    },
    cancel: function(uuid, cb) {
      clientObj.request(utility.addParams(endpoints.subscriptions.cancel, {uuid: uuid}), cb);
    },
    reactivate: function(uuid, cb) {
      clientObj.request(utility.addParams(endpoints.subscriptions.reactivate, {uuid: uuid}), cb);
    },
    terminate: function(uuid, refundType, cb) {
      clientObj.request(utility.addParams(endpoints.subscriptions.terminate, {uuid: uuid, refund_type: refundType}), cb);
    },
    postpone: function(uuid, nextRenewalDate, cb) {
      clientObj.request(utility.addParams(endpoints.subscriptions.postpone, {uuid: uuid, next_renewal_date: nextRenewalDate}), cb);
    },
    preview: function(obj, cb) {
      clientObj.request(endpoints.subscriptions.preview, xmlBuilder.buildObject(obj), cb);
    }
  };

  /* Doc: https://docs.recurly.com/api/transactions */
  this.transactions = {
    list: function(cb, filter) {
      clientObj.request(utility.addQueryParams(endpoints.transactions.list, filter), cb);
    },
    listByAccount: function(accountCode, cb, filter) {
      clientObj.request(utility.addParams(utility.addQueryParams(endpoints.transactions.listByAccount, filter), {account_code: accountCode}), cb);
    },
    get: function(id, cb) {
      clientObj.request(utility.addParams(endpoints.transactions.get, {'id': id}), cb);
    },
    create: function(obj, cb) {
      clientObj.request(endpoints.transactions.create, xmlBuilder.buildObject(obj), cb);
    },
    refund: function(id, cb, amount) {
      var route = utility.addParams(endpoints.transactions.refund, {id: id});
      if (amount) {
        route = utility.addQueryParams(route, { amount_in_cents: amount });
      }
      clientObj.request(route, cb);
    }
  };
  
};

module.exports = recurly;