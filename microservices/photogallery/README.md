# Photogallery Microservice

## Requirements

This application is designed to work with Python version 3.10

## Dependency Management

To better manage dependencies across environments `pip-compile` is used. If it isn't already installed run `pip install pip-tools` to download. All dependencies (without versions) are then stored in a `requirements.in` file in this directory. The `requirements.txt` file is then compiled from the `.in` file. If any dependencies are changed run `pip-compile ./requirements.in`

## Running tests

To run the tests, ensure that required dependencies are installed.

To execute the tests, run the following command:

`pytest`