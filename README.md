# ⚠️ This package is no longer maintained, it may still work but it may cause problems in production.

# Checkhost

This package is a wrapper for [check-host.net](https://check-host.net), since they don't have an official IP Info API.

## Installation

Use the package manager [NPM](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install checkhost.

### NPM

```bash
npm install checkhost --save
```

### Yarn

```bash
yarn add checkhost
```

## Usage

### Importing package

Javascript
```js
const checkhost = require("checkhost");
```

Typescript
```js
import checkhost from "checkhost";
```

### Checking IP

```js
checkhost("1.1.1.1").then(console.log);
```

### Checking from different services

```js
// DB-IP Variants
checkhost("1.1.1.1").then(console.log);
checkhost("1.1.1.1", 0).then(console.log);
checkhost("1.1.1.1", "dbip").then(console.log);
checkhost("1.1.1.1", "db-ip").then(console.log);

// IPGeolocation Variants
checkhost("1.1.1.1").then(console.log);
checkhost("1.1.1.1", 1).then(console.log);
checkhost("1.1.1.1", "ipgeo").then(console.log);
checkhost("1.1.1.1", "ipgeolocation").then(console.log);

// IP2Location Variants
checkhost("1.1.1.1").then(console.log);
checkhost("1.1.1.1", 2).then(console.log);
checkhost("1.1.1.1", "ip2loc").then(console.log);
checkhost("1.1.1.1", "ip2location").then(console.log);

// MaxMind GeoLite2 Variants
checkhost("1.1.1.1").then(console.log);
checkhost("1.1.1.1", 3).then(console.log);
checkhost("1.1.1.1", "geolite2").then(console.log);
checkhost("1.1.1.1", "maxmind-geolite2").then(console.log);

// Combined variants
checkhost("1.1.1.1").then(console.log);
checkhost("1.1.1.1", 4).then(console.log);
checkhost("1.1.1.1", "all").then(console.log);
checkhost("1.1.1.1", "combined").then(console.log);
```

#### Returns

```js
// DB-IP
{
  ip_address: '1.1.1.1',
  hostname: 'one.one.one.one',
  ip_range: [ '1.1.1.0', '1.1.1.255' ],
  isp: 'Cloudflare, Inc.',
  org: '',
  country: 'Australia',
  country_code: 'AU',
  region: 'New South Wales',
  city: 'Sydney',
  timezone: { region: 'Australia/Sydney', timezone: 'GMT+1000' },
  local_time: { now: '05:27:04 (AEST)', date: '2021.05.03' },
  postal_code: 1001
}

// IPGeolocation
{
  ip_address: '1.1.1.1',
  hostname: 'one.one.one.one',
  ip_range: [ '1.1.1.0', '1.1.1.255' ],
  isp: 'APNIC Research and Development',
  org: 'Cloudflare, Inc.',
  country: 'Australia',
  country_code: 'AU',
  region: 'Queensland',
  city: 'Brisbane',
  timezone: { region: 'Australia/Brisbane', timezone: 'GMT+1000' },
  local_time: { now: '05:27:28 (AEST)', date: '2021.05.03' },
  postal_code: 4101
}

// IP2Location
{
  ip_address: '1.1.1.1',
  hostname: 'one.one.one.one',
  ip_range: [ '1.1.1.0', '1.1.1.255' ],
  isp: '',
  org: '',
  country: 'United States of America',
  country_code: 'US',
  region: 'California',
  city: 'Los Angeles',
  timezone: { region: '-07:00', timezone: undefined },
  local_time: { now: '12:27:40 (-0700)', date: '2021.05.02' },
  postal_code: 90001
}

// MaxMind GeoLite2
{
  ip_address: '1.1.1.1',
  hostname: 'one.one.one.one',
  ip_range: [ '' ],
  isp: '',
  org: '',
  country: 'Australia',
  country_code: 'AU',
  region: '',
  city: '',
  timezone: { region: 'Australia/Sydney', timezone: 'GMT+1000' },
  local_time: { now: '05:27:55 (AEST)', date: '2021.05.03' },
  postal_code: NaN
}

// Combined
[
  {
    ip_address: '1.1.1.1',
    hostname: 'one.one.one.one',
    ip_range: [ '1.1.1.0', '1.1.1.255' ],
    isp: 'Cloudflare, Inc.',
    org: '',
    country: 'Australia',
    country_code: 'AU',
    region: 'New South Wales',
    city: 'Sydney',
    timezone: { region: 'Australia/Sydney', timezone: 'GMT+1000' },
    local_time: { now: '05:28:14 (AEST)', date: '2021.05.03' },
    postal_code: 1001
  },
  {
    ip_address: '1.1.1.1',
    hostname: 'one.one.one.one',
    ip_range: [ '1.1.1.0', '1.1.1.255' ],
    isp: 'APNIC Research and Development',
    org: 'Cloudflare, Inc.',
    country: 'Australia',
    country_code: 'AU',
    region: 'Queensland',
    city: 'Brisbane',
    timezone: { region: 'Australia/Brisbane', timezone: 'GMT+1000' },
    local_time: { now: '05:28:14 (AEST)', date: '2021.05.03' },
    postal_code: 4101
  },
  {
    ip_address: '1.1.1.1',
    hostname: 'one.one.one.one',
    ip_range: [ '1.1.1.0', '1.1.1.255' ],
    isp: '',
    org: '',
    country: 'United States of America',
    country_code: 'US',
    region: 'California',
    city: 'Los Angeles',
    timezone: { region: '-07:00', timezone: undefined },
    local_time: { now: '12:28:14 (-0700)', date: '2021.05.02' },
    postal_code: 90001
  },
  {
    ip_address: '1.1.1.1',
    hostname: 'one.one.one.one',
    ip_range: [ '' ],
    isp: '',
    org: '',
    country: 'Australia',
    country_code: 'AU',
    region: '',
    city: '',
    timezone: { region: 'Australia/Sydney', timezone: 'GMT+1000' },
    local_time: { now: '05:28:14 (AEST)', date: '2021.05.03' },
    postal_code: NaN
  }
]
```

### Example

## License
THIS LIBRARY IS NOT IN ANY WAY AFFILIATED WITH [check-host.net](https://check-host.net).  
#### Licensed under [MIT](https://choosealicense.com/licenses/mit/).
