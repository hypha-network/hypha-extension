_NOT READY FOR TESTING_

# What is this?

Hypha extension allows users to publish article, subscribe to authors, and send messages to each other in a peer to peer way. It uses user graph from matters.news to bootstrap contact list and speed up operations that are limited in p2p world.

# Current design

User identify each other via each user's [OrbitDB](https://github.com/orbitdb/orbit-db) address ([key-value store](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbkeyvaluenameaddress)), which stores user name, avatar, peer id and article feed address.

Article feed is also stored in OrbitDB, with [feed store](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbfeednameaddress). [Peer id](https://github.com/libp2p/js-peer-id) is stored on DHT, used to establish p2p connection and send messages.

# Start development

`npm i && npm run dev`

Then go to Chrome extension page, click on "Load unpacked", and load `build` directory.
