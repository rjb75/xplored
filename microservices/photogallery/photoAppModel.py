from enum import Enum

class PhotoTypeModel(str, Enum):
    raw = "raw"
    full = "full"
    regular = "regular"
    small = "small"
    thumb = "thumb"
    small_s3 = "small_s3"