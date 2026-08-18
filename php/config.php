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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'icon',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'icon_large',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'items',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'lastConfigUpdateRuneday',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'letter',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'members',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'typeIcon',
              'type' => '`$STRING`',
            ],
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
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'catalogue',
                    'items.json',
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
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'catalogue',
                    'category.json',
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
                  'parts' => [
                    'm=itemdb_rs',
                    'obj_big.gif',
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
                  'parts' => [
                    'm=itemdb_rs',
                    'obj_sprite.gif',
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
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'catalogue',
                    'detail.json',
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
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'graph',
                    '{itemId}.json',
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
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/m=itemdb_rs/api/info.json',
                  'parts' => [
                    'm=itemdb_rs',
                    'api',
                    'info.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'graph',
              ],
            ],
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'icon',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'icon_large',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'members',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'typeIcon',
              'type' => '`$STRING`',
            ],
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
                  'parts' => [
                    'm=itemdb_oldschool',
                    'api',
                    'catalogue',
                    'items.json',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rank',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'score',
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
                  'parts' => [
                    'm=hiscore',
                    'ranking.json',
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
