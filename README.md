<p align="center">
    <img alt="Unixono" src="https://unixono.com/wp-content/uploads/2018/08/logo.png" width="160" />
  </a>
</p>
<h1 align="center">
  MediaCore Card Link Share and Redirector
</h1>

## 🚀 Quick start

1.  **Deploy to a NodeJS server.**

    This app uses SSR features that require running NodeJS server, which are currently fully supported with `gatsby serve` or in [Gatsby Cloud](https://https://www.gatsbyjs.com/products/cloud/).

    MediaCore backend should accept CORS requests from the domain where the app is deployed.

2.  **Start link sharing!**

    Once your app is deployed (i.e. to https://myexampledomain.com), you can share a link according to the following structure: 

    ```
    https://myexampledomain.com/[client]/[category]/[id]/?queryparam1=value1&queryparam2=value2...
    ```
    | Param         | Type                                                   |  Description      |
    | ------------- |:-------------:                                         |  -----------:     |
    | `client`      | `number`                                               | Client Id         |       
    | `category`    | `'novedades'` \| `'emprendimientos'` \| `'propiedades'`| Element category  |
    | `id`          | `number`                                               | Element Id        |

    | Query Param     | Type           |Default|  Description      |
    | -------------   |:-------------:|  -----------:     |  -----------:     |
    | `url` | `string` | `undefined` | The url where the user will be redirected when clicking on the shared link |
    | `env` (optional)|`'dev'` \| `'staging'`| `undefined`| An optional param to query a development environment backend instead of prod |
    | `operation` (optional) | `string` | `''` | An optional param which will be contatenated to the card `og:title` followed by a hyphen ('Example operation - Card title')|