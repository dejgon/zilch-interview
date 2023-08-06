# zilch-interview

This repo contains code explicitly created for the Zilch Interview.

The assignment consists of two parts:

- Sign-In flow based on Redux Toolkit with mocked API response (production server for the mother app is currently off
  and mocks enable easier testing without being tied to the server's status)
- SWAPI Character Search with debounce, character details page, and redirection to the official SWAPI documentation.

The code is based on my own app idea I was developing earlier this year, for which I also have a Figma file with designs
made by me.

The app is using the `Expo` environment, so it should be pretty straightforward to run using the official documentation.

The app is using feature flags provided from the `ConfigCat` portal, that enables to trigger the `Maintenance` state in
the app. It disables users from doing anything and shows informational screen about the ongoing maintenance. I pushed
the SDK key for the logger to not throw errors about incorrect key provided.

In case of any troubles, please contact me at: cop.damian@gmail.com or through my LinkedIn profile.
