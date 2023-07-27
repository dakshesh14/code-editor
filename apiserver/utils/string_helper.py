import uuid
import random

# local imports
from .constants import pre_prefixes, prefixes, suffixes


def get_uuid(query_len: int = 8) -> str:
    """ Returns a random uuid4 string of length query_len """
    return str(uuid.uuid4())[:query_len]


def get_random_name(
        pre_prefixes_rarity: float = 0.2,
) -> str:
    """
    This function returns a random animal & food name.

    Parameters:
        pre_prefixes_rarity (float): The probability of a pre-prefix being added to the name. Defaults to 0.2.

    Returns:
        str: A random animal & food name with a pre-prefix if pre_prefixes_rarity is met.

    """

    name = f"{random.choice(prefixes)}{random.choice(suffixes)}"
    if random.random() < pre_prefixes_rarity:
        name = f"{random.choice(pre_prefixes)}{name}"

    return name
