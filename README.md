# n8n-nodes-mapbox

This is an n8n community node. It lets you use Mapbox in your n8n workflows.

Mapbox is a mapping platform that provides maps, geocoding, and navigation.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage) 
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node provides the following operations:

- Forward Geocoding 
	Forward geocoding converts location text into geographic coordinates, turning 2 Lincoln Memorial Circle SW into -77.050,38.889

- Reverse Geocoding
	Reverse geocoding converts geographic coordinates into location text, turning -77.050,38.889 into 2 Lincoln Memorial Circle SW

- Static Map Generation
	Static map generation creates a static map image from a location and a set of overlays. 
	Read more about the Mapbox Static Images API [here](https://docs.mapbox.com/api/maps/static-images).

## Credentials

Create a Mapbox account and generate an access token [here](https://docs.mapbox.com/api/accounts/tokens/).

## Compatibility

This node is compatible with n8n 0.215.0 and above.

## Usage

By the time users are looking for community nodes, they probably already know n8n basics. But if you expect new users, you can link to the [Try it out](https://docs.n8n.io/try-it-out/) documentation to help them get started.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Mapbox Static Images API](https://docs.mapbox.com/api/maps/static-images)
* [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocode/)
* [Mapbox Access Tokens](https://docs.mapbox.com/api/accounts/tokens/)
* [Mapbox Playground](https://docs.mapbox.com/playground/static/)

## Version history

Initial release.


