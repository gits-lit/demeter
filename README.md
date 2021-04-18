# Development

this is a [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) project

### Installation

simply run `yarn install` at the root directory


### Usage

if you want to run everything, simply run `yarn start` at the root directory, and it'll start both the frontend and backend.

you can also always cd into `frontend` / `backend` and do stuff

### Design

[Figma](https://www.figma.com/file/nezyU3pDWckmsN4nzEaUOA/HACK-UIOWA?node-id=2%3A1221)


# Background 
Family farming is at risk in America. Recent trends show that ["more than half of all farmers have lost money every year since since 2013"](https://time.com/5736789/small-american-farmers-debt-crisis-extinction/), while large farming companies are able to survive because of their savings. The average family farm doesn't have billions of savings like the large companies, and as such they aren't able to invest in modern technology for their farms.

Farming has always been at the forefront of technology, for it's the innovations in agriculture that have enabled us as a society to grow far beyond the initial villages we originated from. Agriculture has long benefited from technology, and it's not right that family farms can't afford the same technological advantages the large companies can invest in.

A key problem with farming is the sheer overwhelming nature of the job — while anyone can plant seeds and maybe see something grow, it takes a farmer with experience and skill to leverage hundreds of acres to grow and ensure sustainbility for their farm. 

![Demeter Logo](https://i.imgur.com/iHbhLYO.png)

# What is Demeter?
Named after the Greek goddess of the harvest, Demeter is a centralized source of truth for farmers to gain insights for their land. Our software allows farmers to optimally plan farm layouts and maximise efficiency and revenue. The user is able to indicate plots of land where they want to plant and indicate the crop they want to plant there. Based on real-time data about air quality, soil and weather conditions, *Demeter* will determine how suitable a particular area is for planting a particular crop, and provide a general estimation on the expected value of a plot. 

1. Show Demeter the land you're working with

2. Note the weather and choose crops from our recommendations

3. See the impact of your choices on the land and the earnings and cost of the crops you choose.

# Creation Process

## Features

- **Realtime, Relevant Data**: Demeter provides all the data that you need to make the best decisions for your land
- **Recommendations tailed for your property**: Not all land is the same, and it's important to make sure you plant the right crops for the right plot. Demeter's visualization software + agriculture analysis ensures that you'll be able to make the best decisions for your land
- **Anticipate the Future**: Use the best in artificial intelligence to see what your farm looks like in the future

## Engineering

## System Architecture

Demeter is was built with four core components — the frontend, insight api aggregators, the apis themselves, and our custom analysis module.

![How it all connects](https://i.imgur.com/cVEy4OI.png)

### Analysis

We built a custom analysis module in Typescript to aggregate the research we did (see below for sources). This module is leveraged throughout our application through [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/), enabling team members to simultaneously work on application development and data science.

### Frontend

At the core of the user experience is our web app, built with React.js and Deployed with Netlify. Our web app allows farmers to optimally plan farm layouts and maximise efficiency and revenue, and allows users to indicate plots of land where they want to plant and indicate the crop they want to plant there. This was made possible through a fusion of both Mapbox and ThreeJS, allowing us to overlay the users' potential farms over the very land it would live on.

### Insights
Our backend is built in Node.js using Express, and makes use of two APIs: [ambee](https://www.getambee.com/), which provides information about soil quality, air quality, fire risk, and weather in a given location, and [WeatherPlanner](http://weatherplanner.com/weather/index.php), which gives more weather information further into the future. Here is also where the data gets processed using the aforementioned analysis module before being sent to the front-end for presentation.


## Research

Demeter wouldn't be possible without the millenia of human research spent on agriculture. In order to make our predictions and surface the best data for farmers, we needed to gather
- the most common types of crops used in industrial / family farming
- common types of irrigation, filtering by those most affordable
- pricing information for the cost to seed an entire acre for the afermentioned crops
- how to properly factor in soil temperature and moisture levels along with weather data to give appropriate environment scores

We have a full citation of sources [here](https://github.com/gits-lit/hackiowa), but here's an aggregate of the various publications we built Demeter off of.
![Research](https://i.imgur.com/UXp4LlC.png)

# Takeaways
## Accomplishments that we're proud of
There were many challenges that came with building Demeter: drawing 3D models of plots based on user selection onto a map, processing hundreds of data fields and displaying them on a single page in such a way that is concise and easy to understand, doing the research to understand that data ourselves, etc. We are glad to have been able to conquer these hurdles to build a cohesive product.  

## What we learned
We learned about the extensive amount of information that someone needs to know about when farming on an industrial scale, like irrigation techniques, what kind of fertilisers best work with particular plants, the number of different values that are used to quantify how much water, and fertiliser plants use, and so much more. It was genuinely eye opening to learn that there was so much behind farming, and it definitely made us respect the work behind the agriculture industry a lot more. 

## What's next for Demeter, 
A lot of the information that we display on Demeter can definitely be fine tuned - for instance, the metric that show how much water a crop needs had been simplified far more than it should've been, as a crop's water and nutrient needs change throughout its lifetime, and these are important changes that a farmer definitely needs to account for. Integration with at-home sensors would also be another direction we could've taken, as farmers may want a more reliable source of data on top of what can be provided by the API. 


### Sources
- [Irrigation](http://h2oinitiative.com/wp-content/uploads/2018/05/Estimating-Irrigation-Costs-Tacker-et-al.pdf)
- [Irrigation](http://calag.ucanr.edu/Archive/?article=ca.v050n01p11#:~:text=The%20estimated%20annual%20capital%20cost,field%20with%20one%20sprinkler%20system.)
- [Drip Irrigation](https://edis.ifas.ufl.edu/hs388#:~:text=Drip%20irrigation%20requires%20an%20economic,annual%20cost%20of%20disposable%20parts.)
- [Subsurface Irrigation](https://www.farmprogress.com/equipment/switch-drip-irrigation)
- [Corn](http://corn.agronomy.wisc.edu/AA/A030.aspx)
- [Wheat](https://www.farmprogress.com/wheat/preview-2017-wheat-canola-corn-and-sorghum-costs-and-returns#:~:text=Variable%20(out%2Dof%2Dpocket,to%20be%20%24170%20per%20acre.)
- [Rice](https://www.farmprogress.com/rice/water-limiting-factor-south-texas-rice)
- [Strawberries](http://www.ucanr.org/blogs/blogcore/postdetail.cfm?postnum=30784#:~:text=According%20to%20our%202016%20Cost,a%20far%20cry%20from%20%245000.)
- [Onion](https://aggie-horticulture.tamu.edu/smallacreage/crops-guides/vegtables/onions/)
- [Cotton](https://www.farmprogress.com/can-you-grow-more-cotton-less#:~:text=The%20average%20cotton%20farmer%2C%20according,produce%201%20pound%20of%20cotton.)


https://www.cotton.org/pubs/cottoncounts/fieldtofabric/crops.cfm#:~:text=Cotton%20is%20grown%20in%2017,differ%20from%20region%20to%20region.
https://www.cotton.org/pubs/cottoncounts/fieldtofabric/crops.cfm#:~:text=Cotton%20is%20grown%20in%2017,differ%20from%20region%20to%20region.
https://bookstore.ksre.ksu.edu/pubs/L934.pdf
https://www.farmprogress.com/story-once-corn-planted-how-long-take-9-112050
https://aggie-horticulture.tamu.edu/smallacreage/crops-guides/vegtables/onions/
https://extension.psu.edu/strawberry-production
https://wheatlife.org/aboutwheat.html
https://www.ilga.gov/commission/jcar/admincode/008/00800600zz9998br.html
https://calrice.org/industry/how-rice-grows/#:~:text=On%20average%2C%20each%20acre%20will%20yield%20over%208%2C000%20pounds%20of%20rice!
https://coststudyfiles.ucdavis.edu/uploads/cs_public/37/c8/37c88af8-b52e-45eb-bc21-2acd754b0c0a/onionredvs06.pdf
https://www.timesfreepress.com/news/local/story/2015/nov/28/farmers-struggling-make-profit-price-cotton-drops/337918/#:~:text=The%20average%20acre%20in%20the,about%2060%20cents%20a%20pound.
https://coststudyfiles.ucdavis.edu/uploads/cs_public/92/af/92af15bd-a003-4e2e-a796-fc33e253edb8/lettuceicecc09.pdf
https://www.motherearthnews.com/organic-gardening/grow-strawberries-zmaz73mjzraw#:~:text=Two%20thousand%20dollars%20per%20acre,strawberries%20can%20do%20for%20you.
https://agfax.com/2018/02/01/wheat-farmers-have-lost-money-for-4-years-in-a-row-commentary/
https://agfax.com/2020/06/11/corn-soybeans-farm-profitability-more-federal-aid-needed/#:~:text=Soybeans%20in%202018,per%20acre%20in%20MFP%20payments.
https://agfax.com/2020/06/11/corn-soybeans-farm-profitability-more-federal-aid-needed/#:~:text=For%202020%2C%20corn%20revenue%20is,with%20good%20rains%20in%20July.
https://www.statista.com/statistics/236628/retail-price-of-white-rice-in-the-united-states/
https://www.agmrc.org/commodities-products/grains-oilseeds/rice-profile
https://aggie-horticulture.tamu.edu/smallacreage/crops-guides/vegtables/onions/
https://www.farmprogress.com/vegetables/cost-survey-lettuce-industry
https://www.sciencedirect.com/science/article/abs/pii/S0378377419322450