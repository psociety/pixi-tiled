import { Config } from "./Config";
import { Sprite, Texture } from "pixi.js";
import * as ContainerBuilder from "./ContainerBuilder";
import * as Primitives from "./TiledPrimitives";
import { ITiledSprite, ITiledObjectLayer } from "./ITiledMap";

export function Build(meta: ITiledSprite): Sprite {
	// TODO make load from texture atlass
	const sprite = new Sprite(Texture.EMPTY);

	//TODO Set anchor and offsets to center (.5, .5)
	if (!meta.fromImageLayer) {
		sprite.anchor = Config.defSpriteAnchor!;
	}

	//debugger
	ContainerBuilder.ApplyMeta(meta, sprite as any);

	const obj = meta.image!.objectgroup as ITiledObjectLayer;

	if (obj) {
		(sprite as any).primitive = Primitives.BuildPrimitive(obj.objects[0]);
	}

	const hFlip = meta.hFlip;
	const vFlip = meta.vFlip;

	if (hFlip) {
		sprite.scale.x *= -1;
		sprite.anchor.x = 1;
	}

	if (vFlip) {
		sprite.scale.y *= -1;
		sprite.anchor.y = 0;
	}

	return sprite;
}
