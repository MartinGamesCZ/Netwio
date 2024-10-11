# Netwio

Netwio is a small and simple proxy tool, which allows you to locally map any hostname (or domain) to any IP and port. You can for example locally map `example.local` to `10.0.1.2:1234`.

> **Note:** Netwio is still in development and not yet ready for production use.<br />
> **Note:** Linux supported only. Windows coming soon. <br />
> **Note:** Currently only HTTP and HTTPS supported. Other protocols coming soon.

## Installation
1. Download binary from the [releases](https://github.com/MartinGamesCZ/Netwio/releases) page.
2. Place it inside /usr/bin directory.
3. Run the following command to make it executable:
```bash
sudo chmod +x /usr/bin/netwio
```

## Usage
To use the tool, you need to start it's service. You can do this by running the following command:
```bash
sudo netwio --service
```

If you want, you can run this command on startup by adding it to the `/etc/rc.local` file.

## Configuration

### CLI
This is the recommended way.

#### Add route
```bash
sudo netwio add <hostname> <ip> [port (def. 80)]

# For example:
sudo netwio add example.local 1.2.3.4 1234
```

#### Remove route
```bash
sudo netwio remove <hostname>

# For example:
sudo netwio remove example.local
```

### JSON File
You can also edit the config file directly.

The config is saved at `/opt/Netwio/routes.json` and should look like this:
```json
{
  "routes": [
    {
      "hostname": "example.local", // Can be anything, including existing domains, if you want to rewrite that.
      "target_addr": "1.2.3.4",
      "target_port": 1234
    }
  ]
}
```

When you change the config, you need to restart the service. You can do that manually or by running the following command:

```bash
sudo netwio restart
```

## Authors
- [Martin Petr](https://github.com/MartinGamesCZ)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.