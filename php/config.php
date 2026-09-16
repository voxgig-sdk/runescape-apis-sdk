<?php
declare(strict_types=1);

// RunescapeApis SDK configuration

class RunescapeApisConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "RunescapeApis",
                "slug" => "runescape-apis",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://secure.runescape.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "grand_exchange_database" => [],
                    "old_school_grand_exchange" => [],
                    "player_ranking" => [],
                ],
            ],
            "entity" => [
        'grand_exchange_database' => [
          'fields' => [
            [
              'name' => 'average',
              'short' => '30-day moving average with timestamp as key',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'current',
              'type' => '`$OBJECT`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 2,
              ],
            ],
            [
              'name' => 'daily',
              'short' => 'Daily prices with timestamp as key',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'day180',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'day30',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'day90',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'description',
              'short' => 'The item examine text',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'icon',
              'short' => 'The item sprite image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'icon_large',
              'short' => 'The item detail image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'The ItemID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'items',
              'short' => 'The number of items starting with this letter',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'lastConfigUpdateRuneday',
              'short' => 'The runedate when the database was last updated',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'letter',
              'short' => 'The first letter of an item',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'members',
              'short' => 'Whether the item is members-only',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'The item name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'today',
              'type' => '`$OBJECT`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 2,
              ],
            ],
            [
              'name' => 'type',
              'short' => 'The item category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'typeIcon',
              'short' => 'The item category icon URL',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'grand_exchange_database',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'alpha',
                        'orig' => 'alpha',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=itemdb_rs/api/catalogue/items.json',
                  'segments' => [
                    [
                      'lit' => 'm=itemdb_rs',
                    ],
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalogue',
                    ],
                    [
                      'lit' => 'items.json',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'alpha',
                      'category',
                      'page',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.items`',
                  ],
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'catalogue',
                    'items.json',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=itemdb_rs/api/catalogue/category.json',
                  'segments' => [
                    [
                      'lit' => 'm=itemdb_rs',
                    ],
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalogue',
                    ],
                    [
                      'lit' => 'category.json',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'catalogue',
                    'category.json',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=itemdb_rs/obj_big.gif',
                  'segments' => [
                    [
                      'lit' => 'm=itemdb_rs',
                    ],
                    [
                      'lit' => 'obj_big.gif',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'm=itemdb_rs',
                    'obj_big.gif',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=itemdb_rs/obj_sprite.gif',
                  'segments' => [
                    [
                      'lit' => 'm=itemdb_rs',
                    ],
                    [
                      'lit' => 'obj_sprite.gif',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'm=itemdb_rs',
                    'obj_sprite.gif',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'item',
                        'orig' => 'item',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=itemdb_rs/api/catalogue/detail.json',
                  'segments' => [
                    [
                      'lit' => 'm=itemdb_rs',
                    ],
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalogue',
                    ],
                    [
                      'lit' => 'detail.json',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'item',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.item`',
                  ],
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'catalogue',
                    'detail.json',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'item_id',
                        'orig' => 'item_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=itemdb_rs/api/graph/{itemId}.json',
                  'segments' => [
                    [
                      'lit' => 'm=itemdb_rs',
                    ],
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'graph',
                    ],
                    [
                      'lit' => '{itemId}.json',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'item_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'graph',
                    '{itemId}.json',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=itemdb_rs/api/info.json',
                  'segments' => [
                    [
                      'lit' => 'm=itemdb_rs',
                    ],
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'info.json',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'info.json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'old_school_grand_exchange' => [
          'fields' => [
            [
              'name' => 'current',
              'type' => '`$OBJECT`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 2,
              ],
            ],
            [
              'name' => 'description',
              'short' => 'The item examine text',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'icon',
              'short' => 'The item sprite image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'icon_large',
              'short' => 'The item detail image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'The ItemID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'members',
              'short' => 'Whether the item is members-only',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'The item name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'today',
              'type' => '`$OBJECT`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 2,
              ],
            ],
            [
              'name' => 'type',
              'short' => 'The item category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'typeIcon',
              'short' => 'The item category icon URL',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'old_school_grand_exchange',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'alpha',
                        'orig' => 'alpha',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=itemdb_oldschool/api/catalogue/items.json',
                  'segments' => [
                    [
                      'lit' => 'm=itemdb_oldschool',
                    ],
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'catalogue',
                    ],
                    [
                      'lit' => 'items.json',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'alpha',
                      'category',
                      'page',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.items`',
                  ],
                  'parts' => [
                    'm=itemdb_oldschool',
                    'api',
                    'catalogue',
                    'items.json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'player_ranking' => [
          'fields' => [
            [
              'name' => 'name',
              'short' => 'The player\'s username',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rank',
              'short' => 'The player\'s rank',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'score',
              'short' => 'The player\'s score or experience',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'player_ranking',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'size',
                        'orig' => 'size',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'table',
                        'orig' => 'table',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=hiscore/ranking.json',
                  'segments' => [
                    [
                      'lit' => 'm=hiscore',
                    ],
                    [
                      'lit' => 'ranking.json',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'size',
                      'table',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'm=hiscore',
                    'ranking.json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return RunescapeApisFeatures::make_feature($name);
    }
}
