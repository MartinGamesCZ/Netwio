# Netwio

Netwio is a small and simple proxy tool, which allows you to map any domain locally to any IP and port. You can for example locally map `example.local` to `10.0.1.2:1234`.

> **Note:** Netwio is still in development and not yet ready for production use.
> **Note:** Linux supported only. Windows coming soon.

## Usage

Binary and NPM command coming soon. For now, you can clone the repository and run the following command:

```bash
bun run start --service
```

This will try to elevate the process to root, because Netwio needs to edit the hosts file.

## Configuration

In the current version, there is only JSON config available, admin panel coming soon.

The config is saved at `/opt/Netwio/routes.json` and should look like this:
```json
{
  "routes": [
    {
      "hostname": "example.local", // Can be anything, including existing domains, if you want to rewrite that.
      "target_addr": "10.0.1.2",
      "target_port": 1234
    }
  ]
}
```

When you change the config, you need to restart the service. You can do that manually or by running the following command:

```bash
bun run start
```

## Authors
- [Martin Petr](https://github.com/MartinGamesCZ)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.