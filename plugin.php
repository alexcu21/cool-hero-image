<?php
/**
 * Plugin Name: cool-hero-alex — CGB Gutenberg Block Plugin
 * Plugin URI: https://github.com/alexcu21
 * Description: cool-hero-alex — is a Gutenberg plugin created via create-guten-block.
 * Author: Alex Cuadra
 * Author URI: https://github.com/alexcu21
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
