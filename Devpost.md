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